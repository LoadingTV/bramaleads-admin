import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // …другие провайдеры
  ],
  // любые ваши опции (callbacks, session, pages…)
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
