import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { usersAPIs } from "@/apis";

export default NextAuth({
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

        const { userId, password } = credentials;

        const allUsers = await usersAPIs.readUser();
        const exUser = allUsers.users.filter(
          (user: any) => user.userId === userId
        )[0];
        if (!exUser) {
          throw new Error("존재하지 않는 아이디입니다");
        }
        const pwChecked = password === exUser.password;
        if (!pwChecked) throw new Error("비밀먼호가 일치하지 않습니다");

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
    jwt: async ({ token, user }) => {
      if (user) token.user = user;
      return token;
    },
    /**
     * Session Callback
     * ClientSide 에서 NextAuth에 세션을 체크할때마다 실행
     * 반환값은 useSession을 통해 ClientSide에서 사용됨
     * JWT토큰 정보를 Session에 유지시킴
     */
    session: async ({ session, token }) => {
      session.user = {
        id: token.user.id,
        userId: token.user.userId,
        password: token.user.password,
      };
      return session;
    },
  },
  pages: {
    signIn: "/movieApp/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
