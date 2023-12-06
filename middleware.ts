import { NextResponse } from "next/server";

export default function middleware(request) {
  const { cookies } = request;

  const url = request.nextUrl.pathname;
  const tempUrl = request.nextUrl.clone();

  const { _parsed } = cookies;
  const token = _parsed?.get("token");

  const maintaining = false;

  // privatizating AUTHENTICATED ROUTES
  if (maintaining) {
    if (url.includes("/dashboard") || url.includes("/getIn") || url.includes("/register") || url === "/" || url.includes("/review")) {
      tempUrl.pathname = "/maintainace";
      return NextResponse.redirect(tempUrl);
      return NextResponse.next();
    }
  } else {
    if (url.includes("/maintainace")) {
      tempUrl.pathname = "/getIn";
      return NextResponse.redirect(tempUrl);
      return NextResponse.next();
    }
  }
  // TODO:handle redirecting of user already signed in and still on the authentcation page on way or the other...

  return NextResponse.next();
}
