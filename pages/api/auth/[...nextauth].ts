import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { usersAPIs } from "@/api";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    // GithubProvider({
    //   clientId:
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: { label: "userId", type: "text", placeholder: "userId" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) throw new Error("잘못된 정보입니다");

        const { userId } = credentials;
        const exUser = await prisma.user.findUnique({
          where: { userId },
        });
        if (!exUser) {
          console.log("존재하지 않는 아이디입니다");
          throw new Error("존재하지 않는 아이디입니다");
        }

        return exUser;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    session: async ({ session }) => {
      // const exUser = (await prisma.user.findUnique({
      //   where: { userId: session.user?.userId },
      //   select: {
      //     userId: true,
      //     password: true,
      //   },
      // })) as { userId: string; password: string };
      // if (exUser) session.user = exUser;
      // else
      session.user = {
        id: "1",
        userId: "eunju",
        password: "1",
      };

      return session;
    },
  },
  pages: {
    signIn: "/movieApp/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
