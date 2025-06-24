import { NextRequest, NextResponse } from 'next/server';
import { directus } from '@/lib/directus';
import { login, readMe, readUsers } from '@directus/sdk';

export async function POST(req: NextRequest) {
  try {
    const { email, password, isGoogle } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email je povinný.' }, { status: 400 });
    }

    let loginResponse;
    
    if (isGoogle) {
      const adminDirectus = directus; 
      const users = await adminDirectus.request(readUsers({ filter: { email: { _eq: email } } }));
      const user = users[0];

      if (!user) {
        return NextResponse.json({ message: 'Uživatel s tímto emailem neexistuje.' }, { status: 404 });
      }

      const tokenResponse = await fetch(`${process.env.DIRECTUS_URL}/auth/login/${user.id}/token`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}` },
      });
      loginResponse = await tokenResponse.json();

    } else {
      if (!password) {
        return NextResponse.json({ message: 'Heslo je povinné.' }, { status: 400 });
      }
      // Sjednotíme strukturu odpovědi
      const tokenData = await directus.request(login(email, password));
      loginResponse = { data: tokenData };
    }

    const { data } = loginResponse;

    if (!data || !data.access_token) {
      console.error("Nepodařilo se získat access_token z Directusu", loginResponse);
      throw new Error("Nepodařilo se získat access token z Directusu.");
    }

    // Po úspěšném přihlášení (jakýmkoliv způsobem) získáme data o uživateli
    const userDirectus = directus.withToken(data.access_token);
    const user = await userDirectus.request(readMe({ fields: ['id', 'first_name', 'email'] }));
    
    // Vracíme data, která očekává NextAuth
    return NextResponse.json({ data: data, user: user });

  } catch (error: any) {
    console.error('API Login Error:', error);
    const errorMessage = error.errors?.[0]?.message || 'Došlo k neznámé chybě při přihlašování.';
    return NextResponse.json({ message: errorMessage }, { status: 401 });
  }
} 