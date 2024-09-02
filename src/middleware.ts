import authConfig from "@/server/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuthenticated = !!req.auth;

  if (!isAuthenticated && req.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/auth/login", req.nextUrl.origin));
  } else if (isAuthenticated && req.nextUrl.pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/dashboard", req.nextUrl.origin));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
