import { NextRequest, NextResponse } from 'next/server';
import { directus } from '@/lib/directus';
import { login, readMe, readUsers } from '@directus/sdk';

export async function POST(req: NextRequest) {
  try {
    console.log('Login API called');
    const { email, password, isGoogle, name } = await req.json();
    console.log('Login attempt for email:', email, 'isGoogle:', isGoogle);

    if (!email) {
      return NextResponse.json({ message: 'Email je povinný.' }, { status: 400 });
    }

    let loginResponse;
    let user;
    
    if (isGoogle) {
      // Pro Google přihlášení najdeme uživatele a vytvoříme token
      const users = await directus.request(readUsers({ 
        filter: { email: { _eq: email } } 
      }));
      if (users.length === 0) {
        // Pokud uživatel neexistuje, vytvoříme ho
        const createRes = await fetch(`${process.env.DIRECTUS_URL}/users`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            first_name: name || email.split('@')[0],
            status: 'active',
            role: process.env.DIRECTUS_REGISTERED_ROLE_ID // nastav správné ID role!
          })
        });
        if (!createRes.ok) {
          const err = await createRes.text();
          console.error('Chyba při vytváření uživatele v Directusu:', err);
          return NextResponse.json({ message: 'Nepodařilo se vytvořit uživatele v Directusu.' }, { status: 500 });
        }
        const createdUser = await createRes.json();
        user = createdUser.data || createdUser;
      } else {
        user = users[0];
      }

      // Vygenerujeme token pro uživatele pomocí admin API
      const tokenResponse = await fetch(`${process.env.DIRECTUS_URL}/auth/login/${user.id}/token`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        },
      });
      if (!tokenResponse.ok) {
        const err = await tokenResponse.text();
        console.error('Chyba při generování tokenu pro Google uživatele:', err);
        return NextResponse.json({ message: 'Nepodařilo se vytvořit token pro uživatele' }, { status: 500 });
      }
      loginResponse = await tokenResponse.json();
      const { data } = loginResponse;
      if (!data || !data.access_token) {
        console.error("Nepodařilo se získat access_token z Directusu", loginResponse);
        throw new Error("Nepodařilo se získat access token z Directusu.");
      }
      // Po úspěšném přihlášení získáme data o uživateli
      const userDirectus = directus.withToken(data.access_token);
      const userInfo = await userDirectus.request(readMe({ 
        fields: ['id', 'first_name', 'email'] 
      }));
      // Vracíme data, která očekává NextAuth
      return NextResponse.json({ 
        data: {
          access_token: data.access_token,
          expires: data.expires || 900000, // 15 minut default
          refresh_token: data.refresh_token
        }, 
        user: userInfo 
      });
    }
    // Klasické přihlášení s heslem
    if (!password) {
      return NextResponse.json({ message: 'Heslo je povinné.' }, { status: 400 });
    }
    console.log('Attempting classic login with password');
    try {
      // Přímé ověření přes Directus API
      const tokenResponse = await fetch(`${process.env.DIRECTUS_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const tokenData = await tokenResponse.json();
      if (!tokenResponse.ok) {
        console.error('Directus login error:', tokenData);
        return NextResponse.json({ 
          message: 'Nesprávný email nebo heslo.' 
        }, { status: 401 });
      }
      console.log('Login successful, token data received');
      loginResponse = { data: tokenData.data };
    } catch (loginError: any) {
      console.error('Directus login error:', loginError);
      return NextResponse.json({ 
        message: 'Nesprávný email nebo heslo.' 
      }, { status: 401 });
    }
    const { data } = loginResponse;
    if (!data || !data.access_token) {
      console.error("Nepodařilo se získat access_token z Directusu", loginResponse);
      throw new Error("Nepodařilo se získat access token z Directusu.");
    }
    // Po úspěšném přihlášení získáme data o uživateli
    const userDirectus = directus.withToken(data.access_token);
    const userInfo = await userDirectus.request(readMe({ 
      fields: ['id', 'first_name', 'email'] 
    }));
    // Vracíme data, která očekává NextAuth
    return NextResponse.json({ 
      data: {
        access_token: data.access_token,
        expires: data.expires || 900000, // 15 minut default
        refresh_token: data.refresh_token
      }, 
      user: userInfo 
    });
  } catch (error) {
    console.error('API Login Error:', error);
    const errorMessage = error.message || 'Došlo k neznámé chybě při přihlašování.';
    return NextResponse.json({ message: errorMessage }, { status: 401 });
  }
} 