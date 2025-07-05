import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import type { JWT } from "next-auth/jwt"
import type { Session } from "next-auth"
import type { User as NextAuthUser } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { verifyPassword } from "@/lib/auth-utils"

const providers: Provider[] = [
  Credentials({
    credentials: { 
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" } 
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null
      }

      const email = credentials.email as string
      const password = credentials.password as string

      try {
        // データベースからユーザーを検索
        const user = await prisma.user.findUnique({
          where: { email }
        })

        if (!user || !user.password) {
          console.log("ユーザーが見つからないか、パスワードが設定されていません:", email)
          return null
        }

        // パスワードを検証
        const isValid = await verifyPassword(password, user.password)
        
        if (!isValid) {
          console.log("パスワードが無効です:", email)
          return null
        }

        console.log("認証成功:", user.email)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || "user",
          image: user.image,
        }
      } catch (error) {
        console.error("認証エラー:", error)
        return null
      }
    },
  }),
  GitHub({
    profile(profile) {
      return { 
        id: profile.id.toString(),
        name: profile.name,
        email: profile.email,
        image: profile.avatar_url,
        login: profile.login,
        role: "user",
      }
    },
  }),
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")

export const config = {
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.role = user.role || "user"
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role
      }
      return session
    },
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

export const { handlers, signIn, signOut, auth } = NextAuth(config)
