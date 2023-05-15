import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export const middleware = async (req: NextRequest) => {
  const session = await getToken({ req, secret, raw: true });
  const { pathname } = req.nextUrl;

  if (!session) NextResponse.redirect(new URL("/movieApp/login", req.url));

  // if (pathname.startsWith("/movieApp/login") && session)
  //   NextResponse.redirect(new URL("/movieApp", req.url));
};

export const config = {
  matcher: ["/movieApp/login"],
};
