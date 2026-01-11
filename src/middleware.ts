import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  if (url.pathname.startsWith("/keystatic")) {
    const authHeader = context.request.headers.get("Authorization");

    const user = import.meta.env.KEYSTATIC_USER || process.env.KEYSTATIC_USER;
    const pass =
      import.meta.env.KEYSTATIC_PASSWORD || process.env.KEYSTATIC_PASSWORD;

    if (!user || !pass) {
      if (import.meta.env.DEV) return next();
      return new Response("Keystatic credentials not configured", {
        status: 500,
      });
    }

    const expectedAuth = "Basic " + btoa(`${user}:${pass}`);

    if (authHeader !== expectedAuth) {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Keystatic Admin"',
        },
      });
    }
  }

  return next();
});
