import { NextRequest, NextResponse } from 'next/server';
import { directus } from '@/lib/directus';
import { readUsers, createUsers } from '@directus/sdk';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    console.log('Register API called');
    console.log('DIRECTUS_URL:', process.env.DIRECTUS_URL);
    console.log('DIRECTUS_ADMIN_TOKEN exists:', !!process.env.DIRECTUS_ADMIN_TOKEN);
    
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ 
        message: 'Všechna pole jsou povinná.' 
      }, { status: 400 });
    }

    // Kontrola, zda uživatel již existuje
    try {
      const existingUsers = await directus.request(readUsers({
        filter: { email: { _eq: email } }
      }));
      
      if (existingUsers && existingUsers.length > 0) {
        return NextResponse.json({ 
          message: 'Uživatel s tímto emailem již existuje.' 
        }, { status: 409 });
      }
    } catch (error) {
      // Pokud uživatel neexistuje, pokračujeme
    }

    // Hash hesla
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log('Creating user with data:', { name, email, role: '727216aa-7905-4dad-b31c-c20b8ad06dff' });

    // Vytvoření nového uživatele přímo pomocí admin API
    const createUserResponse = await fetch(`${process.env.DIRECTUS_URL}/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: name,
        email: email,
        password: password, // Plain text heslo
        role: '727216aa-7905-4dad-b31c-c20b8ad06dff',
        status: 'active'
      })
    });

    console.log('Create user response status:', createUserResponse.status);
    if (!createUserResponse.ok) {
      const errorText = await createUserResponse.text();
      console.error('Failed to create user:', errorText);
      throw new Error('Nepodařilo se vytvořit uživatele');
    }

    const newUser = await createUserResponse.json();
    console.log('User creation result:', newUser);

    if (!newUser.data) {
      throw new Error('Nepodařilo se vytvořit uživatele');
    }

    return NextResponse.json({ 
      message: 'Uživatel byl úspěšně vytvořen.',
      user: {
        id: newUser.data.id,
        email: newUser.data.email,
        name: newUser.data.first_name
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('API Register Error:', error);
    
    if (error.message?.includes('already exists')) {
      return NextResponse.json({ 
        message: 'Uživatel s tímto emailem již existuje.' 
      }, { status: 409 });
    }
    
    return NextResponse.json({ 
      message: 'Došlo k chybě při registraci. Zkuste to prosím znovu.' 
    }, { status: 500 });
  }
} 