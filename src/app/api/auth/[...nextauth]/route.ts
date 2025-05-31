import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { Resend } from 'resend'
import { directus } from '@/lib/directus'
import { createItems, readItems } from '@directus/sdk'

if (!process.env.NEXTAUTH_URL) {
  throw new Error('Missing NEXTAUTH_URL environment variable')
}

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable')
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth credentials')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        try {
          await resend.emails.send({
            from: 'AppDilna <no-reply@appdilna.cz>',
            to: identifier,
            subject: 'Přihlášení do AppDílna',
            html: `
              <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
                <h1 style="color: #b87333; margin-bottom: 20px;">Přihlášení do AppDílna</h1>
                <p style="margin-bottom: 20px;">Klikněte na tlačítko níže pro přihlášení do vaší AppDílna:</p>
                <a href="${url}" 
                   style="display: inline-block; padding: 12px 24px; background-color: #b87333; color: white; text-decoration: none; border-radius: 5px;">
                  Přihlásit se
                </a>
                <p style="margin-top: 20px; font-size: 14px; color: #666;">
                  Pokud jste o přihlášení nežádali, tento email můžete ignorovat.
                </p>
              </div>
            `
          })
        } catch (error) {
          console.error('Failed to send verification email:', error)
          throw new Error('Failed to send verification email')
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        // Kontrola, zda uživatel existuje v Directusu
        const existingUsers = await directus.request(readItems('directus_users', {
          filter: { email: { _eq: user.email } },
        }));

        if (existingUsers.length === 0) {
          // Vytvoření nového uživatele v Directusu
          await directus.request(createItems('directus_users', [{
            email: user.email,
            first_name: user.name?.split(' ')[0] || '',
            last_name: user.name?.split(' ').slice(1).join(' ') || '',
            role: process.env.DIRECTUS_DEFAULT_ROLE_ID,
            status: 'active',
          }]));
        }

        return true;
      } catch (error) {
        console.error('Error during sign in:', error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + '/dashboard'
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, account }) {
      return token;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 