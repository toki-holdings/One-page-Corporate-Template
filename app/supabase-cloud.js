(function () {
  const config = window.KAISHA_RAKU_SUPABASE || {};
  const supabaseBase = (config.url || "").replace(/\/$/, "");
  const publicApiBase = (config.apiBase || "").replace(/\/$/, "");
  const anonKey = config.anonKey || "";
  const stateTable = "app_state_snapshots";

  function enabled() {
    return Boolean((publicApiBase || supabaseBase) && anonKey && window.fetch);
  }

  function endpoint(path) {
    const base = publicApiBase || supabaseBase;
    return `${base}${path}`;
  }

  function headers(accessToken = "") {
    return {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken || anonKey}`,
      "Content-Type": "application/json",
    };
  }

  function sessionKey() {
    return "kaisha-raku-supabase-session";
  }

  function readSession() {
    try {
      const session = JSON.parse(localStorage.getItem(sessionKey()) || "null");
      if (!session?.access_token) return null;
      if (session.expires_at && Number(session.expires_at) * 1000 < Date.now()) return null;
      return session;
    } catch {
      return null;
    }
  }

  function writeSession(session) {
    localStorage.setItem(sessionKey(), JSON.stringify(session || null));
  }

  function clearSession() {
    localStorage.removeItem(sessionKey());
  }

  async function request(path, options = {}, accessToken = "") {
    if (!enabled()) throw new Error("Supabase config is missing.");
    let response;
    try {
      response = await fetch(endpoint(path), {
        ...options,
        headers: { ...headers(accessToken), ...(options.headers || {}) },
      });
    } catch (error) {
      throw new Error(`Supabaseに接続できません。ネットワーク、DNS、またはプロジェクトURLを確認してください。詳細: ${error.message}`);
    }
    const text = await response.text();
    let body = null;
    try { body = text ? JSON.parse(text) : null; } catch { body = text; }
    if (!response.ok) {
      const message = body?.msg || body?.message || body?.error_description || body?.error || `HTTP ${response.status}`;
      throw new Error(message);
    }
    return body;
  }

  async function sendOtp(email) {
    await request("/auth/v1/otp", {
      method: "POST",
      body: JSON.stringify({
        email,
        create_user: true,
        data: {},
      }),
    });
    return { ok: true, message: "認証コードをメールに送信しました。メールに記載されたコードを入力してください。" };
  }

  async function verifyOtp(email, token) {
    const session = await request("/auth/v1/verify", {
      method: "POST",
      body: JSON.stringify({
        email,
        token,
        type: "email",
      }),
    });
    writeSession(session);
    return session;
  }

  async function signOut() {
    const session = readSession();
    if (session?.access_token) {
      try {
        await request("/auth/v1/logout", { method: "POST" }, session.access_token);
      } catch {}
    }
    clearSession();
  }

  async function pullState() {
    const session = readSession();
    if (!session?.user?.id || !session.access_token) return null;
    const rows = await request(
      `/rest/v1/${stateTable}?user_id=eq.${encodeURIComponent(session.user.id)}&select=state,updated_at&order=updated_at.desc&limit=1`,
      { method: "GET" },
      session.access_token
    );
    return rows?.[0]?.state || null;
  }

  async function pushState(state) {
    const session = readSession();
    if (!session?.user?.id || !session.access_token) return;
    await request(`/rest/v1/${stateTable}`, {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify({
        user_id: session.user.id,
        state,
        updated_at: new Date().toISOString(),
      }),
    }, session.access_token);
  }

  window.KaishaRakuCloud = {
    enabled,
    readSession,
    clearSession,
    sendOtp,
    verifyOtp,
    signOut,
    pullState,
    pushState,
  };
})();
