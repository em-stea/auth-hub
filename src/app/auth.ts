import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Passkey from "next-auth/providers/passkey";

import { verifyPassword } from "@/shared/lib/password";
import { prisma } from "@/shared/lib/prisma";

function getRelayingParty() {
  const authUrl = process.env.AUTH_URL ?? "http://localhost:3000";
  const url = new URL(authUrl);
  return {
    name: "Auth Hub",
    id: url.hostname,
    origin: url.origin,
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === "string" ? credentials.email : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user?.password) {
          return null;
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
    // Google and GitHub both return verified emails, so an existing user with the
    // same address is the same person. Without this, signing in with a provider
    // after an email/password signup fails with OAuthAccountNotLinked.
    Google({ allowDangerousEmailAccountLinking: true }),
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Passkey({
      relayingParty: getRelayingParty(),
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  experimental: {
    enableWebAuthn: true,
  },
});
