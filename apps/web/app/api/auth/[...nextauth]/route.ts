import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
// import { prisma } from "@repo/database";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },

    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials?.password) return null;

    //     const user = await prisma.user.findUnique({
    //       where: { email: credentials.email },
    //     });

    //     if (!user) return null;

    //     const isMatch = await bcrypt.compare(
    //       credentials.password,
    //       user.password
    //     );

    //     if (!isMatch) return null;

    //     return {
    //       id: user.id.toString(),
    //       name: user.name,
    //       email: user.email,
    //     };
    //   },
    // }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // Add user.id for Credentials login
      if (user) {
        token.id = user.id;
      }

      // Add access token for Google login
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
