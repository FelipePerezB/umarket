import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([]);

export default clerkMiddleware((auth, req) => {
  console.log(req.url)
  if(req.url.includes("api")) return;
  // if (req.pathname.includes("api")) return;
  // console.log(auth())
  // console.log(req);
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*..*|_next).*)", "/(.*)", "/(api|trpc)(.*)"],
};
