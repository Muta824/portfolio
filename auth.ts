import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

const providers: Provider[] = [
  Credentials({
    credentials: { 
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" } 
    },
    authorize(c) {
      if (c.email === "test@example.com" && c.password === "password") {
        return {
          id: "test",
          name: "Test User",
          email: "test@example.com",
        }
      }
      return null
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
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, signIn, signOut, auth } = NextAuth(config)
