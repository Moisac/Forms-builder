import NextAuth from 'next-auth'
import { PrismaClient } from '@prisma/client'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
  ],

  jwt: {
    secret: process.env.JWT_SECRET,
  },

  debug: true,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/signin'
  }
})
