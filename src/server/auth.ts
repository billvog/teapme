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
  events: {
    async createUser({ user }) {
      if (!user.id) {
        return;
      }

      // Create a profile for the user
      await db.profile.create({
        data: {
          userId: user.id,
        },
      });
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/login",
    newUser: "/dashboard/onboard",
  },
  ...authConfig,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
