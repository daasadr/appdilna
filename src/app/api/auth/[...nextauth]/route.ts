import NextAuth, { NextAuthOptions, User, Account, Session } from "next-auth"
import type { JWT } from "next-auth/jwt"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { directus } from '@/lib/directus'
import { createItems, readItems } from '@directus/sdk'
import bcrypt from 'bcryptjs'

if (!process.env.NEXTAUTH_URL) {
  throw new Error('Missing NEXTAUTH_URL environment variable')
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth credentials')
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
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;
        // Najdi uživatele v app_users
        const directusUrl = process.env.DIRECTUS_URL!;
        const directusToken = process.env.DIRECTUS_TOKEN!;
        const res = await fetch(
          `${directusUrl}/items/app_users?filter[email][_eq]=${encodeURIComponent(email)}`,
          {
            headers: { Authorization: `Bearer ${directusToken}` },
          }
        );
        const data = await res.json();
        const user = data.data && data.data[0];
        if (!user || !user.password) return null;
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          provider: 'email',
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: '/',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (!user.email) return false;
      // Pokud je to Google login, vytvoř uživatele v Directusu pokud neexistuje
      if (account?.provider === 'google') {
        try {
          const directusUrl = process.env.DIRECTUS_URL!;
          const directusToken = process.env.DIRECTUS_TOKEN!;
          // Zkus najít uživatele v app_users podle emailu
          const res = await fetch(
            `${directusUrl}/items/app_users?filter[email][_eq]=${encodeURIComponent(user.email!)}`,
            {
              headers: { Authorization: `Bearer ${directusToken}` },
            }
          );
          const data = await res.json();
          if (!data.data || data.data.length === 0) {
            // Pokud neexistuje, vytvoř
            await fetch(`${directusUrl}/items/app_users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${directusToken}`,
              },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                avatar: user.image,
              }),
            });
          }
        } catch (error) {
          console.error('Error during Google sign in:', error);
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : baseUrl + '/dashboard'
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Přidáme access_token a refresh_token do session pokud existují
      if (token?.access_token) (session as any).accessToken = token.access_token;
      if (token?.refresh_token) (session as any).refreshToken = token.refresh_token;
      if (token?.id && session.user && typeof session.user === 'object') {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user, account }: { token: JWT; user?: User; account?: Account | null }) {
      // Uložíme access_token a refresh_token z Directusu do JWT
      if (user && account?.provider === 'credentials') {
        token.access_token = (user as any).access_token;
        token.refresh_token = (user as any).refresh_token;
        token.id = (user as any).id;
      }
      return token;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 