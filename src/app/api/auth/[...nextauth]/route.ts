import NextAuth, { NextAuthOptions, User, Account, Session } from "next-auth"
import type { JWT } from "next-auth/jwt"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { directus } from '@/lib/directus'
import { readMe, readUsers } from '@directus/sdk'
import bcrypt from 'bcryptjs'

if (!process.env.NEXTAUTH_URL) {
  throw new Error('Missing NEXTAUTH_URL environment variable')
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth credentials')
}

// Rozšíření Session typu
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
  }
}

// Typ pro data vrácená z Directus API po přihlášení
interface DirectusLoginData {
  access_token: string;
  expires: number; // Doba platnosti v ms
  refresh_token: string;
}

// Typ pro uživatele vráceného z authorize, rozšířený o data z Directusu
interface AppUser extends User {
  id: string;
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
}

/**
 * Použije refresh token k získání nového access tokenu z Directusu.
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url = `${process.env.DIRECTUS_URL}/auth/refresh`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refresh_token: token.refreshToken,
        mode: 'json'
      }),
    });
    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;
    const newTokens = refreshedTokens.data;
    return {
      ...token,
      accessToken: newTokens.access_token,
      accessTokenExpires: Date.now() + newTokens.expires,
      refreshToken: newTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error('Chyba při obnovování tokenu', error);
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Přihlášení e-mailem',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Heslo', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Ověření přes Directus API
        const res = await fetch(`${process.env.DIRECTUS_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) {
          console.log("Directus login failed:", await res.text());
          return null;
        }

        const { data } = await res.json();

        // Získání uživatele
        const userRes = await fetch(`${process.env.DIRECTUS_URL}/users/me`, {
          headers: { Authorization: `Bearer ${data.access_token}` },
        });
        const userData = await userRes.json();

        return {
          id: userData.data.id,
          email: userData.data.email,
          name: userData.data.first_name,
          accessToken: data.access_token,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        if (account.provider === 'credentials') {
           token.accessToken = (user as AppUser).accessToken;
           token.accessTokenExpires = (user as AppUser).accessTokenExpires;
           token.refreshToken = (user as AppUser).refreshToken;
           token.id = user.id;
        }
        else if (account.provider === 'google') {
          try {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: user.email, isGoogle: true }),
            });
            const loginData = await res.json();
            const { data, user: directusUser } = loginData;
            if (data && directusUser) {
              token.accessToken = data.access_token;
              token.accessTokenExpires = Date.now() + data.expires;
              token.refreshToken = data.refresh_token;
              token.id = directusUser.id;
            }
          } catch(e) {
            console.error("Chyba při Google přihlášení do Directusu", e);
            token.error = "GoogleLoginError";
          }
        }
      }
      
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }
      
      console.log("Access token expiroval, pokouším se o refresh...");
      return refreshAccessToken(token);
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        (session.user as any).id = token.id;
        session.accessToken = token.accessToken as string;
        session.error = token.error as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 