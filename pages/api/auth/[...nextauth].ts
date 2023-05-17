import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
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
          throw new Error("존재하지 않는 아이디입니다");
        }
        // TODO 비밀번호 일치여부 체크
        console.log("1exUser=", exUser);
        return exUser;
      },
    }),
  ],
  callbacks: {
    /**
     * JWT Callback
     * 웹 토큰은 실행 혹은 업데이트 될 떄마다 콜백이 실행됨
     * 반환값은 암호화되어 쿠키에 저장됨
     */
    jwt: async ({ token, user, account }) => {
      // if (account && user) {
      //   return {
      //     accessToken: account.access_token,
      //     accessTokenExpires: account.expires_at,
      //     refreshToken: account.refresh_token,
      //     // user,
      //   };
      // }
      console.log("2token=", user);
      token.user = user;
      return token;
    },
    /**
     * Session Callback
     * ClientSide 에서 NextAuth에 세션을 체크할때마다 실행
     * 반환값은 useSession을 통해 ClientSide에서 사용됨
     * JWT토큰 정보를 Session에 유지시킴
     */
    session: async ({ session, token }) => {
      // session은 Provider에서 넘겨받은 정보

      // session.user = token.user;
      // session.accessToken = token.accessToken;
      // session.accessTokenExpires = token.accessTokenExpires;

      // session.error = token.error
      // const exUser = await prisma.user.findUnique({
      //   where: { userId: session.user.userId },
      //   select: {
      //     userId: true,
      //     password: true,
      //   },
      // });
      // session.user = exUser as { userId: string; password: string };
      session.user = token.user;
      console.log("3session=", session, token);

      // session.user = token.user;
      return session; // useSession() 의 data값이 됨
    },
  },
  pages: {
    signIn: "/movieApp/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
