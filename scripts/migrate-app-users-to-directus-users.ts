const nodeFetch = (...args: any[]) =>
  import('node-fetch').then(mod => mod.default(...args))
require('dotenv').config()

const DIRECTUS_URL = process.env.DIRECTUS_URL!
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN!
const REGISTERED_ROLE_ID = process.env.DIRECTUS_REGISTERED_ROLE_ID!

async function migrate() {
  // 1. Získej všechny uživatele z app_users
  const appUsersRes = await nodeFetch(
    `${DIRECTUS_URL}/items/app_users?limit=-1`,
    {
      headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
    }
  )
  const appUsers = ((await appUsersRes.json()) as any).data

  for (const user of appUsers) {
    // Pokud už má directus_user, přeskoč
    if (user.directus_user) continue

    // Vygeneruj nové heslo (nebo použij default)
    const password = Math.random().toString(36).slice(-10)

    // 2. Vytvoř uživatele v directus_users
    const createUserRes = await nodeFetch(`${DIRECTUS_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify({
        email: user.email,
        password,
        role: REGISTERED_ROLE_ID,
        status: 'active',
      }),
    })
    const newUser = ((await createUserRes.json()) as any).data
    if (!newUser) {
      console.error(`Nepodařilo se vytvořit uživatele: ${user.email}`)
      continue
    }

    // 3. Aktualizuj app_users, nastav directus_user na nové ID
    await nodeFetch(`${DIRECTUS_URL}/items/app_users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify({
        directus_user: newUser.id,
      }),
    })

    // 4. Vypiš nové heslo (ulož si je, nebo pošli uživatelům)
    console.log(`Migrace: ${user.email} -> nové heslo: ${password}`)
  }
}

migrate().then(() => console.log('Migrace dokončena.'))
