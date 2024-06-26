import { createClient } from "@libsql/client";

const client = createClient({
  fetch: (params: RequestInfo) => {
    return fetch(params, { cache: "no-store" });
  },
  url: process.env.TURSO_DATABASE_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export default client;
