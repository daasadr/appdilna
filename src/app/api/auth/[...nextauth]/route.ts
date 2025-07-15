import NextAuth, { NextAuthOptions, Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

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
    console.log("[refreshAccessToken] Používám refreshToken:", token.refreshToken);
    const payload = {
      refresh_token: token.refreshToken,
      mode: 'json'
    };
    console.log("[refreshAccessToken] Request payload:", payload);
    const response = await fetch(`${process.env.DIRECTUS_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const rawRefreshResponse = await response.clone().text();
    console.log("[refreshAccessToken] Response:", rawRefreshResponse);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[refreshAccessToken] Refresh failed:', errorData);

      // Pokud je chyba "Invalid user credentials", token je neplatný
      if (errorData?.errors?.[0]?.message?.includes('Invalid user credentials')) {
        console.error('[refreshAccessToken] Invalid credentials detected, forcing logout');
        return {
          ...token,
          error: 'RefreshAccessTokenError',
          accessToken: undefined,
          refreshToken: undefined
        };
      }

      throw errorData;
    }

    const refreshedTokens = await response.json();
    const newTokens = refreshedTokens.data;
    console.log("[refreshAccessToken] newTokens.refresh_token:", newTokens.refresh_token, "old token.refreshToken:", token.refreshToken);

    if (!newTokens.refresh_token || typeof newTokens.refresh_token !== 'string' || newTokens.refresh_token.trim() === '') {
      console.error('[refreshAccessToken] ERROR: Directus nevrátil platný refresh token! Uživatel bude odhlášen.');
      return {
        ...token,
        error: 'RefreshAccessTokenError',
        accessToken: undefined,
        refreshToken: undefined
      };
    }

    return {
      ...token,
      accessToken: newTokens.access_token,
      accessTokenExpires: Date.now() + newTokens.expires,
      refreshToken: newTokens.refresh_token,
      error: undefined // Vyčistíme chybu při úspěšném refreshu
    };
  } catch (error) {
    console.error('Chyba při obnovování tokenu', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
      accessToken: undefined,
      refreshToken: undefined
    };
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

        const rawLoginResponse = await res.clone().text();
        console.log("[Directus authorize] /auth/login response:", rawLoginResponse);

        if (!res.ok) {
          console.log("Directus login failed:", rawLoginResponse);
          return null;
        }

        const { data } = await res.json();
        console.log("[Directus authorize] parsed data:", data);

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
          refreshToken: data.refresh_token,
          accessTokenExpires: Date.now() + data.expires,
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
      const userRefreshToken = (user && 'refreshToken' in user) ? (user as any).refreshToken : undefined;
      console.log("[JWT callback] token před změnou:", JSON.stringify(token));
      if (user && account) {
        if (account.provider === 'credentials') {
          token.accessToken = (user as AppUser).accessToken;
          token.accessTokenExpires = (user as AppUser).accessTokenExpires;
          token.refreshToken = (user as AppUser).refreshToken ?? token.refreshToken;
          token.id = user.id;
        }
        else if (account.provider === 'google') {
          try {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: user.email, isGoogle: true, name: user.name }),
            });
            const loginData = await res.json();
            const { data, user: directusUser } = loginData;
            console.log('[JWT callback][Google] loginData:', loginData);
            if (data && directusUser) {
              token.accessToken = data.access_token;
              token.accessTokenExpires = Date.now() + data.expires;
              token.refreshToken = data.refresh_token ?? token.refreshToken;
              token.id = directusUser.id;
            }
          } catch(e) {
            console.error("Chyba při Google přihlášení do Directusu", e);
            token.error = "GoogleLoginError";
          }
        }
      }
      token.refreshToken = token.refreshToken ?? undefined;
      console.log("[JWT callback] token po změně:", JSON.stringify(token));
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }
      console.log("Access token expiroval, pokouším se o refresh...");
      return refreshAccessToken(token);
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      console.log('[Session callback] token:', JSON.stringify(token));
      if (token) {
        (session.user as any).id = token.id;
        session.accessToken = token.accessToken as string;
        session.error = token.error as string;

        // Pokud je chyba s refresh tokenem nebo chybí access token, odhlásíme uživatele
        if (token.error === 'RefreshAccessTokenError' || !token.accessToken) {
          console.log('Session error detected or missing access token, user will be logged out');
          session.error = 'RefreshAccessTokenError';
          // Vyčistíme session data
          session.accessToken = undefined;
          (session.user as any).id = undefined;
        }
      }
      console.log('[Session callback] session:', JSON.stringify(session));
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
