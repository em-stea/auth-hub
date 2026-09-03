import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === process.env.AUTH_EMAIL &&
          credentials?.password === process.env.AUTH_PASSWORD
        ) {
          return {
            id: "1",
            email: credentials.email as string,
            name: "Admin",
          };
        }

        return null;
      },
    }),
    Google,
    GitHub,
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
});
