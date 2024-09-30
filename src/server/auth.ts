import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthConfig } from "next-auth";

import authConfig from "@/server/auth.config";
import { db } from "@/server/db";

export const authOptions: NextAuthConfig = {
  callbacks: {
    async jwt({ token, user }) {
      if (!user || !user.id) {
        return token;
      }

      // Add the user id to the token
      token.id = user.id;

      // Fetch the profile id
      const profile = await db.profile.findUnique({
        where: {
          userId: user.id,
        },
      });

      // ...and add it to the token
      if (profile) {
        token.profileId = profile.id;
      }

      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          profileId: token.profileId,
        },
      };
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
