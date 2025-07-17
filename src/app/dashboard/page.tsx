import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import {
  createDirectus,
  readItems,
  rest,
  staticToken,
  readItem,
} from '@directus/sdk'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

// Importy z Node.js pro práci se soubory
import fs from 'fs/promises'
import path from 'path'

// Definice typu pro aplikaci, aby byl kód čitelnější
type App = {
  id: string
  name: string
  slug: string // Přidáno pro název adresáře
  status: 'draft' | 'published'
  app_title?: string
  welcome_message?: string
  user_owner?: string // Přidáno pro bezpečnostní kontrolu
  // Přidej další pole, která máš v kolekci
}

/**
 * Rekurzivně kopíruje obsah jednoho adresáře do druhého.
 */
async function copyDir(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}

async function buildAppAction(formData: FormData) {
  'use server'

  const session = await getServerSession(authOptions)
  if (!session || !(session.user as any)?.id) {
    throw new Error('Nepřihlášený uživatel!')
  }

  const appId = formData.get('appId') as string
  const userId = (session.user as any).id

  if (!appId) {
    throw new Error('Chybí App ID!')
  }

  // Použijeme globálního klienta s admin právy pro operace na serveru
  // V budoucnu můžeme zpřísnit oprávnění
  const directusAdmin = createDirectus(process.env.DIRECTUS_URL!)
    .with(staticToken(process.env.DIRECTUS_ADMIN_TOKEN!))
    .with(rest())

  try {
    // 1. Načteme data aplikace z Directusu
    const app = (await directusAdmin.request(
      readItem('apps', appId, {
        fields: [
          'id',
          'name',
          'status',
          'slug',
          'app_title',
          'welcome_message',
          'user_owner',
        ],
      })
    )) as App
    console.log(`Načtena data pro aplikaci: ${app.name}`)

    // BEZPEČNOSTNÍ KONTROLA: Ověříme, že aplikace patří přihlášenému uživateli
    if (!app.user_owner || app.user_owner !== userId) {
      throw new Error('Nemáte oprávnění k sestavení této aplikace!')
    }

    if (!app.slug) {
      throw new Error(`Aplikace s ID ${appId} nemá definovaný slug.`)
    }

    // 2. Definujeme cesty
    const templatePath = path.join(process.cwd(), 'pwa-template')
    const outputPath = path.join(process.cwd(), 'generated-apps', app.slug)
    console.log(`Cesta k šabloně: ${templatePath}`)
    console.log(`Výstupní cesta: ${outputPath}`)

    // 3. Zkopírujeme šablonu
    console.log('Kopíruji šablonu...')
    await copyDir(templatePath, outputPath)
    console.log('Šablona zkopírována.')

    // 4. Nahradíme zástupné symboly
    console.log('Nahrazuji zástupné symboly...')
    const layoutPath = path.join(outputPath, 'src', 'app', 'layout.tsx')
    const pagePath = path.join(outputPath, 'src', 'app', 'page.tsx')
    const packageJsonPath = path.join(outputPath, 'package.json')

    const filesToPatch = [layoutPath, pagePath, packageJsonPath]
    for (const filePath of filesToPatch) {
      let content = await fs.readFile(filePath, 'utf-8')
      content = content.replace(/%%APP_TITLE%%/g, app.app_title || app.name)
      content = content.replace(
        /%%WELCOME_MESSAGE%%/g,
        app.welcome_message || 'Vítejte!'
      )
      content = content.replace(/%%APP_SLUG%%/g, app.slug)
      await fs.writeFile(filePath, content, 'utf-8')
      console.log(`Upraven soubor: ${filePath}`)
    }
    console.log('Zástupné symboly nahrazeny.')

    // TODO: V dalším kroku spustíme `npm install` a `npm run build`

    console.log(
      `Aplikace "${app.name}" byla úspěšně vygenerována v adresáři ${outputPath}`
    )
  } catch (error) {
    console.error('Došlo k chybě při sestavování aplikace:', error)
    // V reálné aplikaci bychom měli lepší error handling
  }

  revalidatePath('/dashboard')
}

async function getAppsForUser(
  accessToken: string,
  userId: string
): Promise<App[]> {
  try {
    const userDirectus = createDirectus(process.env.DIRECTUS_URL!)
      .with(staticToken(accessToken))
      .with(rest())

    const apps = await userDirectus.request(
      readItems('apps', {
        // Přidáváme všechna pole, která potřebujeme
        fields: [
          'id',
          'name',
          'status',
          'slug',
          'app_title',
          'welcome_message',
        ],
        // KRITICKÉ: Filtrujeme pouze aplikace patřící přihlášenému uživateli
        filter: {
          user_owner: { _eq: userId },
        },
      })
    )
    return apps as App[]
  } catch (error: any) {
    console.error('Chyba při načítání aplikací z Directusu:', error)

    // Kontrola, zda je chyba způsobená neplatným tokenem
    if (
      error?.response?.status === 401 ||
      error?.message?.includes('Invalid user credentials') ||
      error?.errors?.[0]?.message?.includes('Invalid user credentials')
    ) {
      console.log('Detekována chyba s tokenem, přesměrovávám na přihlášení')
      throw new Error('TOKEN_EXPIRED')
    }

    return [] // V případě jiné chyby vrátíme prázdné pole
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session || !(session.user as any)?.id || !(session as any).accessToken) {
    redirect('/')
  }

  // Kontrola chyby refresh tokenu nebo chybějícího access tokenu
  if (session.error === 'RefreshAccessTokenError' || !session.accessToken) {
    console.log(
      'Refresh token error or missing access token detected, redirecting to login'
    )
    redirect('/?error=RefreshAccessTokenError')
  }

  const userAccessToken = (session as any).accessToken
  let userApps: App[] = []

  try {
    userApps = await getAppsForUser(userAccessToken, (session as any).user.id)
  } catch (error: any) {
    if (error.message === 'TOKEN_EXPIRED') {
      console.log('Token expired, redirecting to login')
      redirect('/?error=TokenExpired')
    }
    // Pro jiné chyby pokračujeme s prázdným polem aplikací
    console.error('Unexpected error loading apps:', error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Vaše Aplikace</h1>
          <p className="text-lg text-gray-600">
            Spravujte své vytvořené PWA projekty.
          </p>
        </div>
        <Link href="/apps/create">
          <button className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700">
            + Vytvořit novou aplikaci
          </button>
        </Link>
      </header>

      <main>
        <div className="rounded-lg bg-white p-6 shadow-md">
          {userApps.length > 0 ? (
            <ul className="space-y-4">
              {userApps.map(app => (
                <li
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {app.name}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-1 text-sm ${
                        app.status === 'published'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {app.status === 'published' ? 'Publikováno' : 'Koncept'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link
                      href={`/apps/${app.id}/builder`}
                      className="text-blue-600 hover:underline"
                    >
                      Spravovat
                    </Link>
                    <form action={buildAppAction}>
                      <input type="hidden" name="appId" value={app.id} />
                      <button
                        type="submit"
                        className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
                      >
                        Sestavit
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border-2 border-dashed py-12 text-center">
              <p className="mb-4 text-gray-500">
                Zatím nemáte vytvořené žádné aplikace.
              </p>
              <p className="text-gray-500">
                Klikněte na tlačítko vpravo nahoře pro vytvoření první.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
