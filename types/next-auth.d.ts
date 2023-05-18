import NextAuth from "next-auth";

declare module "next-auth" {
  // 타입 재정의. session.user의 타입으로 정의됨
  interface Session {
    user: {
      id: string;
      userId: string;
      password: string;
    };
  }
  interface User {
    id: string;
    userId: string;
    password: string;
    createdAt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      userId: string;
      password: string;
      createdAt: string;
    };
  }
}
