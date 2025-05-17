import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from '@/lib/prisma'
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { Resend } from 'resend'

// const prisma = new PrismaClient()

const resend = new Resend(process.env.RESEND_API_KEY)

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      // Nepoužíváme SMTP, ale custom handler
      async sendVerificationRequest({ identifier, url }) {
        await resend.emails.send({
          from: 'daasa.d@seznam.cz',
          to: identifier,
          subject: 'Přihlášení do AppDílna',
          html: `<p>Klikněte pro přihlášení: <a href="${url}">${url}</a></p>`
        })
      },
      from: 'daasa.d@seznam.cz',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
})

export { handler as GET, handler as POST } 