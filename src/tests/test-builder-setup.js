// Test nastavení builderu v Directusu
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'https://dir.appdilna.cz';
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

console.log('🔧 Testování nastavení builderu v Directusu...');
console.log('DIRECTUS_URL:', DIRECTUS_URL);
console.log('ADMIN_TOKEN exists:', !!ADMIN_TOKEN);

async function testAppsCollection() {
  if (!ADMIN_TOKEN) {
    console.log('\n⚠️  Chybí ADMIN_TOKEN. Nastavte DIRECTUS_ADMIN_TOKEN v .env');
    return;
  }

  try {
    console.log('\n📋 Testování kolekce apps...');
    
    // 1. Načti schéma kolekce apps
    const schemaResponse = await fetch(`${DIRECTUS_URL}/collections/apps`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!schemaResponse.ok) {
      console.error('❌ Kolekce apps neexistuje nebo není dostupná');
      return;
    }

    const schema = await schemaResponse.json();
    console.log('✅ Kolekce apps existuje');
    console.log('Schéma:', JSON.stringify(schema, null, 2));

    // 2. Načti pole kolekce
    const fieldsResponse = await fetch(`${DIRECTUS_URL}/fields/apps`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (fieldsResponse.ok) {
      const fields = await fieldsResponse.json();
      console.log('\n📝 Pole kolekce apps:');
      fields.data.forEach(field => {
        console.log(`  - ${field.field}: ${field.type}${field.schema?.is_nullable ? ' (nullable)' : ''}`);
      });

      // Ověř povinná pole
      const requiredFields = ['name', 'slug', 'status', 'user_owner', 'pages', 'settings', 'theme'];
      const missingFields = requiredFields.filter(field => 
        !fields.data.find(f => f.field === field)
      );

      if (missingFields.length > 0) {
        console.log('\n⚠️  Chybí pole:', missingFields);
      } else {
        console.log('\n✅ Všechna povinná pole jsou přítomna');
      }
    }

    // 3. Načti existující aplikace
    const appsResponse = await fetch(`${DIRECTUS_URL}/items/apps?limit=5`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (appsResponse.ok) {
      const apps = await appsResponse.json();
      console.log(`\n📱 Nalezeno ${apps.data.length} aplikací`);
      
      if (apps.data.length > 0) {
        const sampleApp = apps.data[0];
        console.log('Ukázková aplikace:', {
          id: sampleApp.id,
          name: sampleApp.name,
          slug: sampleApp.slug,
          status: sampleApp.status,
          hasPages: !!sampleApp.pages,
          hasSettings: !!sampleApp.settings,
          hasTheme: !!sampleApp.theme
        });
      }
    }

  } catch (error) {
    console.error('❌ Chyba při testování kolekce apps:', error.message);
  }
}

async function testPermissions() {
  if (!ADMIN_TOKEN) return;

  try {
    console.log('\n🔐 Testování oprávnění...');
    
    // Načti role
    const rolesResponse = await fetch(`${DIRECTUS_URL}/roles`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (rolesResponse.ok) {
      const roles = await rolesResponse.json();
      const registeredRole = roles.data.find(r => r.name === 'Registered');
      
      if (registeredRole) {
        console.log('✅ Role "Registered" existuje');
        
        // Načti oprávnění pro roli
        const permissionsResponse = await fetch(`${DIRECTUS_URL}/permissions?filter[role][_eq]=${registeredRole.id}&filter[collection][_eq]=apps`, {
          headers: {
            'Authorization': `Bearer ${ADMIN_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        if (permissionsResponse.ok) {
          const permissions = await permissionsResponse.json();
          console.log(`📋 Nalezeno ${permissions.data.length} oprávnění pro kolekci apps`);
          
          permissions.data.forEach(perm => {
            console.log(`  - ${perm.action}: ${perm.permissions ? 'povoleno' : 'zakázáno'}`);
          });
        }
      } else {
        console.log('⚠️  Role "Registered" neexistuje');
      }
    }

  } catch (error) {
    console.error('❌ Chyba při testování oprávnění:', error.message);
  }
}

async function testBuilderData() {
  if (!ADMIN_TOKEN) return;

  try {
    console.log('\n🧪 Testování builder dat...');
    
    // Vytvoř test aplikaci
    const testApp = {
      name: 'Test Builder App',
      slug: 'test-builder-app',
      status: 'draft',
      user_owner: null, // bude nastaveno později
      pages: [{
        id: 'home',
        name: 'Domovská stránka',
        slug: 'home',
        components: [{
          id: 'component-test',
          type: 'hero',
          name: 'Hero sekce',
          props: {
            title: 'Test',
            subtitle: 'Test aplikace',
            buttonText: 'Test',
            buttonLink: '#',
            buttonVariant: 'primary'
          },
          position: 0,
          style: {},
          children: []
        }],
        settings: {}
      }],
      settings: {
        seo: {
          title: 'Test App',
          description: 'Test aplikace',
          keywords: []
        },
        analytics: {
          enabled: false,
          trackingId: ''
        }
      },
      theme: {
        colors: {
          primary: '#3B82F6',
          secondary: '#6B7280',
          accent: '#10B981',
          background: '#FFFFFF',
          text: '#1F2937'
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter'
        },
        spacing: 'medium',
        borderRadius: 'medium'
      }
    };

    console.log('📝 Test data připravena');
    console.log('JSON pages:', JSON.stringify(testApp.pages, null, 2));

  } catch (error) {
    console.error('❌ Chyba při testování builder dat:', error.message);
  }
}

async function main() {
  await testAppsCollection();
  await testPermissions();
  await testBuilderData();
  
  console.log('\n🎉 Testování dokončeno!');
  console.log('\n📋 Další kroky:');
  console.log('1. Ověřte kolekci apps v Directus Admin Panelu');
  console.log('2. Nastavte oprávnění pro roli "Registered"');
  console.log('3. Otestujte builder na /apps/create a /apps/[id]/builder');
}

main(); 