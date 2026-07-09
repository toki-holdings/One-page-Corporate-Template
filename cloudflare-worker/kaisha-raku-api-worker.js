const DEFAULT_SUPABASE_URL = "https://ptaouofqawvjezqlxvjk.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_Q8VjIlX6EcS8_GEZ9ZripQ_3O22sobX";

const ALLOWED_ORIGINS = new Set([
  "https://toki-holdings.jp",
  "https://www.toki-holdings.jp",
  "https://app.toki-holdings.jp",
]);

function corsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://toki-holdings.jp";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "apikey, authorization, content-type, prefer",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(payload, status, origin) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(origin),
    },
  });
}

function isAllowedPath(pathname) {
  return (
    pathname.startsWith("/auth/v1/") ||
    pathname.startsWith("/rest/v1/app_state_snapshots")
  );
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    const url = new URL(request.url);
    if (!isAllowedPath(url.pathname)) {
      return jsonResponse({ message: "Not found" }, 404, origin);
    }

    const supabaseUrl = (env.SUPABASE_URL || DEFAULT_SUPABASE_URL).replace(/\/$/, "");
    const anonKey = env.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
    const upstreamUrl = `${supabaseUrl}${url.pathname}${url.search}`;
    const headers = new Headers(request.headers);

    headers.set("apikey", anonKey);
    if (!headers.get("authorization")) {
      headers.set("authorization", `Bearer ${anonKey}`);
    }
    headers.delete("host");
    headers.delete("origin");
    headers.delete("referer");

    const response = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
      redirect: "manual",
    });

    const responseHeaders = new Headers(response.headers);
    Object.entries(corsHeaders(origin)).forEach(([key, value]) => responseHeaders.set(key, value));
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  },
};
