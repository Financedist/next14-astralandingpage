import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isHomeRoute = createRouteMatcher(["/"]);    // Verifica si una solicitud coincide con la ruta principal / (la página de inicio).

export default clerkMiddleware((auth, req) => {   // Es el middleware principal que maneja la autenticación. Toma una función de callback como argumento,
                                                  // que recibe dos parámetros: auth y req. Auth -> Info del user. req -> objeto de la solicitud HTTP.
  const { userId } = auth();

  if (userId && isHomeRoute(req)) {                       // Si existe un usuario autenticado y quiere ir a la página de inicio
    return NextResponse.rewrite(new URL("/", req.url));   // se le redirige a dicha página de inicio.
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"], // Esta configuración le dice a Next.js en qué rutas debe aplicarse este middleware.
};