import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export const middleware = async (req: NextRequest) => {
  const session = await getToken({ req, secret, raw: true });
  const { pathname } = req.nextUrl;

  if (
    (pathname.includes("/movieApp/login") ||
      pathname.includes("/movieApp/join")) &&
    session
  )
    return NextResponse.redirect(new URL("/movieApp", req.url));
};

export const config = {
  matcher: ["/movieApp/login", "/movieApp/join"],
};
