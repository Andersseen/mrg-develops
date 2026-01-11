export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  if (url.pathname.startsWith("/keystatic")) {
    const authHeader = context.request.headers.get("Authorization");

    const user = context.env.KEYSTATIC_USER;
    const pass = context.env.KEYSTATIC_PASSWORD;

    if (!user || !pass) {
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

  return context.next();
};
