import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthConfig } from "next-auth";

import authConfig from "@/server/auth.config";
import { db } from "@/server/db";

export const authOptions: NextAuthConfig = {
  callbacks: {
    jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/login",
  },
  ...authConfig,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
