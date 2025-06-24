const nodeFetch = (...args) => import('node-fetch').then(mod => mod.default(...args));
require('dotenv').config();

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;
const REGISTERED_ROLE_ID = process.env.DIRECTUS_REGISTERED_ROLE_ID;

async function migrate() {
  console.log('Spouštím chytrou migraci...');
  const appUsersRes = await nodeFetch(`${DIRECTUS_URL}/items/app_users?limit=-1`, {
    headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
  });
  const responseJson = await appUsersRes.json();

  console.log('Odpověď z Directus API:', JSON.stringify(responseJson, null, 2));
  const appUsers = responseJson.data;

  if (!Array.isArray(appUsers)) {
    console.error('Chyba: Odpověď z API neobsahuje pole "data" s uživateli.');
    return;
  }
  console.log(`Nalezeno ${appUsers.length} uživatelů k migraci.`);

  for (const user of appUsers) {
    if (user.directus_user) {
      console.log(`INFO: Uživatel ${user.email} již je migrován, přeskakuji.`);
      continue;
    }

    let newUserPayload;
    if (user.provider === 'google') {
      newUserPayload = {
        email: user.email,
        role: REGISTERED_ROLE_ID,
        provider: 'google',
        external_identifier: user.email, // Nebo jiné unikátní ID od Google, pokud ho máš
        status: 'active'
      };
      console.log(`INFO: Připravuji Google uživatele ${user.email}`);
    } else {
      const password = Math.random().toString(36).slice(-10);
      newUserPayload = {
        email: user.email,
        password: password,
        role: REGISTERED_ROLE_ID,
        provider: 'default',
        status: 'active'
      };
      console.log(`INFO: Připravuji email uživatele ${user.email} s heslem: ${password}`);
    }

    const createUserRes = await nodeFetch(`${DIRECTUS_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify(newUserPayload)
    });
    
    const createUserJson = await createUserRes.json();

    if (!createUserRes.ok) {
      console.error(`CHYBA: Nepodařilo se vytvořit uživatele v directus_users pro: ${user.email}`);
      console.error('Chyba z Directusu:', createUserJson);
      continue;
    }
    
    const newUser = createUserJson.data;

    await nodeFetch(`${DIRECTUS_URL}/items/app_users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify({ directus_user: newUser.id })
    });

    console.log(`OK: Migrován ${user.email}`);
  }
}

migrate().then(() => console.log('Migrace dokončena.')); 