require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const { createDirectus, rest, createItems } = require('@directus/sdk')

const prisma = new PrismaClient()
const directus = createDirectus(process.env.DIRECTUS_URL).with(rest())

async function migrateApps() {
  try {
    // 1. Načti všechny appky z původní DB
    const apps = await prisma.apps.findMany()

    for (const app of apps) {
      // 2. Připrav data pro Directus (případně uprav strukturu podle nových polí)
      const newApp = {
        // id: app.id, // pokud máš v Directusu UUID, jinak vynech
        name: app.name,
        slug: app.slug,
        template_id: app.template_id,
        settings: app.settings,
        status: app.status,
      }

      // 3. Zapiš do Directusu
      try {
        await directus.request(createItems('apps', [newApp]))
        console.log(`Migrated app: ${app.name}`)
      } catch (e) {
        console.error(`Failed to migrate app ${app.name}:`, e.message)
      }
    }
    console.log('Migration finished!')
  } catch (e) {
    console.error('Migration error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

migrateApps()
