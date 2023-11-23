import { NextResponse } from "next/server";

export default function middleware(request) {
  const { cookies } = request;

  const url = request.nextUrl.pathname;
  const tempUrl = request.nextUrl.clone();

  const { _parsed } = cookies;
  const token = _parsed?.get("token");

  console.log(url)

  const maintaining = true;

  // privatizating AUTHENTICATED ROUTES
  if (maintaining) {
    if (url.includes("/dashboard") || url.includes("/getIn") || url.includes("/register") || url === "/" || url.includes("/review")) {
    // if (url.includes("/dashboard") || url.includes("/getIn") || url === "/" || url.includes("/review")) {
      // if (token === undefined || token?.value === "undefined" || token?.value === undefined || token?.value === null) {
      tempUrl.pathname = "/maintainace";
      console.log("REDIRECTING !!!");
      return NextResponse.redirect(tempUrl);
      // }
      return NextResponse.next();
    }
  }
  // TODO:handle redirecting of user already signed in and still on the authentcation page on way or the other...

  return NextResponse.next();
}
