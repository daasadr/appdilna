import { NextResponse } from 'next/server';
import directus from '@/lib/directus';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    // Zkontroluj, zda už uživatel s tímto emailem existuje
    const existing = await directus.items('app_users').readByQuery({
      filter: { email: { _eq: email } },
    });
    if (existing.data && existing.data.length > 0) {
      return NextResponse.json({ message: 'This user already exists' }, { status: 409 });
    }
    // Hashuj heslo
    const hashedPassword = await bcrypt.hash(password, 10);
    // Vytvoř nového uživatele
    await directus.items('app_users').createOne({
      name,
      email,
      password: hashedPassword,
      provider: 'email',
    });
    return NextResponse.json({ message: 'Account Created!' }, { status: 201 });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message || 'An unexpected error occurred, please try again', error: e }, { status: 500 });
  }
} 