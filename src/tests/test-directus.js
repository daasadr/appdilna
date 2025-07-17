// Test pro ověření Directus připojení
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'https://dir.appdilna.cz'

console.log('Testing Directus connection...')
console.log('DIRECTUS_URL:', DIRECTUS_URL)
console.log('DIRECTUS_ADMIN_TOKEN exists:', !!process.env.DIRECTUS_ADMIN_TOKEN)

// Test základního připojení bez tokenu
async function testBasicConnection() {
  try {
    console.log('\n🔍 Testing basic connection...')
    const response = await fetch(`${DIRECTUS_URL}/server/info`)

    if (response.ok) {
      const data = await response.json()
      console.log('✅ Directus server is accessible!')
      console.log('Server info:', data)
    } else {
      console.error(
        '❌ Directus server not accessible:',
        response.status,
        response.statusText
      )
    }
  } catch (error) {
    console.error('❌ Error connecting to Directus server:', error.message)
  }
}

// Test s admin tokenem
async function testWithToken() {
  if (!process.env.DIRECTUS_ADMIN_TOKEN) {
    console.log('\n⚠️  No admin token provided. Skipping authenticated tests.')
    console.log('To get an admin token:')
    console.log('1. Go to your Directus admin panel')
    console.log('2. Navigate to Settings > API Tokens')
    console.log('3. Create a new token with admin permissions')
    console.log('4. Set it as DIRECTUS_ADMIN_TOKEN environment variable')
    return
  }

  try {
    console.log('\n🔐 Testing with admin token...')
    const response = await fetch(`${DIRECTUS_URL}/users`, {
      headers: {
        Authorization: `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      console.log('✅ Admin token is valid!')
      console.log('Users count:', data.data?.length || 0)

      // Test roles
      const rolesResponse = await fetch(`${DIRECTUS_URL}/roles`, {
        headers: {
          Authorization: `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })

      if (rolesResponse.ok) {
        const rolesData = await rolesResponse.json()
        console.log(
          'Available roles:',
          rolesData.data?.map(r => ({ id: r.id, name: r.name })) || []
        )
      }
    } else {
      console.error(
        '❌ Admin token is invalid:',
        response.status,
        response.statusText
      )
    }
  } catch (error) {
    console.error('❌ Error with admin token:', error.message)
  }
}

async function main() {
  await testBasicConnection()
  await testWithToken()
}

main()
