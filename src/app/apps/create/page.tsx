import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { createDirectus, rest, staticToken, createItem } from "@directus/sdk"

// Helper funkce pro generování slugu
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Nahradí mezery pomlčkou
    .replace(/[^\w\-]+/g, '') // Odstraní všechny ne-word znaky
    .replace(/\-\-+/g, '-'); // Nahradí vícenásobné pomlčky jednou
}

async function createAppAction(formData: FormData) {
  'use server'

  const session = await getServerSession(authOptions);
  // Získáme access token uživatele ze session
  const userAccessToken = (session as any)?.accessToken;

  if (!session || !(session.user as any)?.id || !userAccessToken) {
    throw new Error("Nepřihlášený uživatel nebo chybí token!");
  }

  const appName = formData.get('appName') as string;
  const userId = (session.user as any).id;

  if (!appName) {
    throw new Error("Název aplikace je povinný.");
  }

  const appSlug = slugify(appName);

  // Vytvoříme novou, dočasnou instanci Directus klienta s tokenem uživatele
  const userDirectus = createDirectus(process.env.DIRECTUS_URL!)
    .with(staticToken(userAccessToken))
    .with(rest());

  try {
    // Použijeme klienta s uživatelským tokenem
    await userDirectus.request(
      createItem('apps', {
        name: appName,
        slug: appSlug,
        status: 'draft',
        user_owner: userId,
      })
    );
  } catch (error) {
    console.error("Chyba při vytváření aplikace v Directusu:", error);
    throw new Error("Nepodařilo se vytvořit aplikaci.");
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export default async function CreateAppPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Vytvořit novou aplikaci</h1>
      <form action={createAppAction} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="appName" className="block text-gray-700 font-bold mb-2">
            Název vaší aplikace
          </label>
          <input
            type="text"
            id="appName"
            name="appName"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Moje úžasná PWA"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Vytvořit a pokračovat
        </button>
      </form>
    </div>
  )
} 