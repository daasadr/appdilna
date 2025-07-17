import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createDirectus, rest, staticToken, createItem } from '@directus/sdk'

// Helper funkce pro generování slugu
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Nahradí mezery pomlčkou
    .replace(/[^\w\-]+/g, '') // Odstraní všechny ne-word znaky
    .replace(/\-\-+/g, '-') // Nahradí vícenásobné pomlčky jednou
}

async function createAppAction(formData: FormData) {
  'use server'

  const session = await getServerSession(authOptions)
  // Získáme access token uživatele ze session
  const userAccessToken = (session as any)?.accessToken

  if (!session || !(session.user as any)?.id || !userAccessToken) {
    throw new Error('Nepřihlášený uživatel nebo chybí token!')
  }

  const appName = formData.get('appName') as string
  const userId = (session.user as any).id

  if (!appName) {
    throw new Error('Název aplikace je povinný.')
  }

  const appSlug = slugify(appName)

  // Vytvoříme novou, dočasnou instanci Directus klienta s tokenem uživatele
  const userDirectus = createDirectus(process.env.DIRECTUS_URL!)
    .with(staticToken(userAccessToken))
    .with(rest())

  try {
    // Použijeme klienta s uživatelským tokenem
    await userDirectus.request(
      createItem('apps', {
        name: appName,
        slug: appSlug,
        status: 'draft',
        user_owner: userId,
      })
    )
  } catch (error) {
    console.error('Chyba při vytváření aplikace v Directusu:', error)
    throw new Error('Nepodařilo se vytvořit aplikaci.')
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export default async function CreateAppPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }

  // Kontrola chyby refresh tokenu nebo chybějícího access tokenu
  if (session.error === 'RefreshAccessTokenError' || !session.accessToken) {
    console.log(
      'Refresh token error or missing access token detected, redirecting to login'
    )
    redirect('/?error=RefreshAccessTokenError')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Vytvořit novou aplikaci</h1>
      <form
        action={createAppAction}
        className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="appName"
            className="mb-2 block font-bold text-gray-700"
          >
            Název vaší aplikace
          </label>
          <input
            type="text"
            id="appName"
            name="appName"
            required
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Moje úžasná PWA"
          />
        </div>
        <button
          type="submit"
          className="focus:shadow-outline w-full rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Vytvořit a pokračovat
        </button>
      </form>
    </div>
  )
}
