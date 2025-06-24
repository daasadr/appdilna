import { NextResponse } from 'next/server';
import { directus } from '@/lib/directus';
import { readItems, createItems } from '@directus/sdk';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    // Zkontroluj, zda už uživatel s tímto emailem existuje v Directus users
    const existing = await directus.request(readItems('users', {
      filter: { email: { _eq: email } }
    }));
    if (existing.length > 0) {
      return NextResponse.json({ message: 'This user already exists' }, { status: 409 });
    }
    // Hashuj heslo
    const hashedPassword = await bcrypt.hash(password, 10);
    // Vytvoř nového uživatele v Directus users
    await directus.request(createItems('users', [{
      first_name: name,
      email,
      password: hashedPassword,
      provider: 'default',
      status: 'active',
      role: '727216aa-7905-4dad-b31c-c20b8ad06dff', // Registered user role
    }]));
    return NextResponse.json({ message: 'Account Created!' }, { status: 201 });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message || 'An unexpected error occurred, please try again', error: e }, { status: 500 });
  }
} 