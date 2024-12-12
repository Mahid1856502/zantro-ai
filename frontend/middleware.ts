import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  // Update the session as before
  const response = await updateSession(request);

  // Check if the route should be protected
  const protectedPaths = ["/api"];
  const excludedPaths = ["/api/download"];
  const isProtectedRoute = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );
  const isExcludedRoute = excludedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (isProtectedRoute && !isExcludedRoute) {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.refreshSession();

    if (!session) {
      // Redirect to login page if no session
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // Add check for /app and /app/* routes to modify the layout
  if (request.nextUrl.pathname.startsWith("/app")) {
    // Set custom header for /app routes
    response.headers.set("x-swiftor-app", "true");
  }

  // Return the response from updateSession, now including the header if applicable
  return response;
}

export const config = {
  matcher: [
    // Add the matcher for static assets and sign in/sign up paths
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/signin",
    "/signup",
  ],
};
