(function () {
  const config = window.KAISHA_RAKU_SUPABASE || {};
  const supabaseBase = (config.url || "").replace(/\/$/, "");
  const publicApiBase = (config.apiBase || "").replace(/\/$/, "");
  const anonKey = config.anonKey || "";
  const stateTable = "app_state_snapshots";
  const companiesTable = "kaisha_companies";
  const membersTable = "kaisha_company_members";
  const invitationsTable = "kaisha_company_invitations";
  const companySnapshotsTable = "kaisha_company_state_snapshots";
  const sessionStorageKey = "kaisha-raku-supabase-session";
  const idleTimeoutMs = 24 * 60 * 60 * 1000;

  function enabled() {
    return Boolean((publicApiBase || supabaseBase) && anonKey && window.fetch);
  }

  function endpoint(path) {
    const isLocalDesktop = window.location.protocol === "http:" && /^(127\.0\.0\.1|localhost)$/.test(window.location.hostname);
    if (path.startsWith("/company/v1/") && publicApiBase) {
      return `${publicApiBase}${path}`;
    }
    const base = isLocalDesktop ? "/__supabase" : (publicApiBase || supabaseBase);
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
    return sessionStorageKey;
  }

  function readSession() {
    try {
      const stored = localStorage.getItem(sessionKey()) || sessionStorage.getItem(sessionKey()) || "null";
      const session = JSON.parse(stored);
      if (!session?.access_token && !session?.refresh_token) return null;
      if (stored && !localStorage.getItem(sessionKey())) {
        localStorage.setItem(sessionKey(), JSON.stringify({ ...session, last_active_at: Date.now() }));
        sessionStorage.removeItem(sessionKey());
      }
      return session;
    } catch {
      return null;
    }
  }

  function writeSession(session) {
    if (!session) {
      clearSession();
      return;
    }
    localStorage.setItem(sessionKey(), JSON.stringify({
      ...session,
      saved_at: Date.now(),
      last_active_at: Date.now(),
    }));
    sessionStorage.removeItem(sessionKey());
  }

  function clearSession() {
    localStorage.removeItem(sessionKey());
    sessionStorage.removeItem(sessionKey());
  }

  function touchSession() {
    const session = readSession();
    if (!session) return;
    localStorage.setItem(sessionKey(), JSON.stringify({ ...session, last_active_at: Date.now() }));
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
      const rawMessage = body?.msg || body?.message || body?.error_description || body?.error || "";
      let message = rawMessage || `HTTP ${response.status}`;
      if (/Error sending (confirmation|magic link) email/i.test(rawMessage)) {
        message = "認証メールを送信できません。Supabase の SMTP 設定、送信元メール、SMTP パスワードを確認してください。";
      } else if (!rawMessage && response.status === 403) {
        message = "HTTP 403: 認証またはアクセス権限で拒否されました。Supabase の API キー、メール認証設定、SMTP 設定を確認してください。";
      }
      throw new Error(message);
    }
    return body;
  }

  function authSession() {
    const session = readSession();
    if (!session?.user?.id || (!session.access_token && !session.refresh_token)) return null;
    return session;
  }

  async function refreshSession(session) {
    if (!session?.refresh_token) return null;
    const refreshed = await request("/auth/v1/token?grant_type=refresh_token", {
      method: "POST",
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });
    const nextSession = {
      ...session,
      ...refreshed,
      user: refreshed.user || session.user,
      refresh_token: refreshed.refresh_token || session.refresh_token,
    };
    writeSession(nextSession);
    return nextSession;
  }

  async function activeSession() {
    const session = authSession();
    if (!session) return null;
    const expiresAtMs = Number(session.expires_at || 0) * 1000;
    if (expiresAtMs && expiresAtMs - Date.now() < 60 * 1000) {
      return await refreshSession(session);
    }
    touchSession();
    return session;
  }

  async function requireSession() {
    const session = await activeSession();
    if (!session?.user?.id || !session.access_token) throw new Error("ログイン状態を確認してください。");
    return session;
  }

  function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
  }

  function encodeValue(value) {
    return encodeURIComponent(String(value || ""));
  }

  function verificationInput(value) {
    const raw = String(value || "").trim();
    if (!/^https?:\/\//i.test(raw)) return { token: raw, type: "email" };
    try {
      const url = new URL(raw);
      const hashParams = new URLSearchParams(url.hash.replace(/^#/, ""));
      const params = new URLSearchParams(url.search);
      const tokenHash = params.get("token_hash") || hashParams.get("token_hash") || "";
      const token = params.get("token") || hashParams.get("token") || "";
      const type = params.get("type") || hashParams.get("type") || "email";
      const accessToken = hashParams.get("access_token") || params.get("access_token") || "";
      const refreshToken = hashParams.get("refresh_token") || params.get("refresh_token") || "";
      const expiresAt = Number(hashParams.get("expires_at") || params.get("expires_at") || 0);
      return { tokenHash, token, type, accessToken, refreshToken, expiresAt };
    } catch {
      return { token: raw, type: "email" };
    }
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
    return { ok: true, message: "認証メールを送信しました。数字コードが届いた場合はコードを入力してください。リンクだけ届いた場合は、そのリンクを入力欄に貼り付けてもログインできます。" };
  }

  async function verifyOtp(email, token) {
    const credential = verificationInput(token);
    if (credential.accessToken && credential.refreshToken) {
      const user = await request("/auth/v1/user", { method: "GET" }, credential.accessToken);
      const session = {
        access_token: credential.accessToken,
        refresh_token: credential.refreshToken,
        expires_at: credential.expiresAt || Math.floor(Date.now() / 1000) + 3600,
        user,
      };
      writeSession(session);
      return session;
    }
    const payload = credential.tokenHash
      ? { token_hash: credential.tokenHash, type: credential.type || "email" }
      : { email, token: credential.token, type: credential.type || "email" };
    const session = await request("/auth/v1/verify", {
      method: "POST",
      body: JSON.stringify(payload),
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
    const session = await activeSession();
    if (!session) return null;
    const rows = await request(
      `/rest/v1/${stateTable}?user_id=eq.${encodeURIComponent(session.user.id)}&select=state,updated_at&order=updated_at.desc&limit=1`,
      { method: "GET" },
      session.access_token
    );
    return rows?.[0]?.state || null;
  }

  async function pushState(state) {
    const session = await activeSession();
    if (!session) return;
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

  async function pullMemberships() {
    const session = await activeSession();
    if (!session) return [];
    return await request(
      `/rest/v1/${membersTable}?user_id=eq.${encodeValue(session.user.id)}&status=eq.active&select=*`,
      { method: "GET" },
      session.access_token
    ) || [];
  }

  async function pullInvitations(email = "") {
    const session = await activeSession();
    if (!session) return [];
    const targetEmail = normalizeEmail(email || session.user.email || "");
    if (!targetEmail) return [];
    return await request(
      `/rest/v1/${invitationsTable}?email=eq.${encodeValue(targetEmail)}&status=eq.pending&select=*`,
      { method: "GET" },
      session.access_token
    ) || [];
  }

  async function pullCompany(companyId) {
    const session = await activeSession();
    if (!session || !companyId) return null;
    const rows = await request(
      `/rest/v1/${companiesTable}?id=eq.${encodeValue(companyId)}&select=*&limit=1`,
      { method: "GET" },
      session.access_token
    );
    return rows?.[0] || null;
  }

  async function pullCompanyState(companyId) {
    const session = await activeSession();
    if (!session || !companyId) return null;
    const rows = await request(
      `/rest/v1/${companySnapshotsTable}?company_id=eq.${encodeValue(companyId)}&select=state,updated_at&limit=1`,
      { method: "GET" },
      session.access_token
    );
    return rows?.[0]?.state || null;
  }

  async function upsertRows(table, rows, accessToken) {
    const payload = Array.isArray(rows) ? rows : [rows];
    if (!payload.length) return null;
    return await request(`/rest/v1/${table}`, {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(payload),
    }, accessToken);
  }

  async function createCompany(company, member, companyState) {
    const session = await requireSession();
    await request("/company/v1/create", {
      method: "POST",
      body: JSON.stringify({
        company,
        member: {
          ...member,
          phoneNumber: normalizeEmail(member.phoneNumber || session.user.email || ""),
        },
        companyState: companyState || {},
      }),
    }, session.access_token);
  }

  async function pushCompanyState(companyId, state) {
    const session = await activeSession();
    if (!session || !companyId) return;
    await upsertRows(companySnapshotsTable, {
      company_id: companyId,
      state,
      updated_by: session.user.id,
      updated_at: new Date().toISOString(),
    }, session.access_token);
  }

  async function inviteCompanyMember(invitation) {
    const session = await requireSession();
    await upsertRows(invitationsTable, {
      id: invitation.id,
      company_id: invitation.companyId,
      email: normalizeEmail(invitation.phoneNumber),
      role: invitation.role,
      permissions: invitation.permissions || {},
      status: invitation.status || "pending",
      invited_by_user_id: session.user.id,
      expires_at: invitation.expiresAt,
      accepted_at: invitation.acceptedAt || null,
      updated_at: new Date().toISOString(),
    }, session.access_token);
  }

  async function acceptInvitation(invitation, member) {
    const session = await requireSession();
    await upsertRows(membersTable, {
      id: member.id,
      company_id: member.companyId,
      user_id: session.user.id,
      email: normalizeEmail(member.phoneNumber || session.user.email || ""),
      role: member.role,
      permissions: member.permissions || {},
      status: "active",
      invited_by_user_id: invitation.invitedByUserId || invitation.invited_by_user_id || null,
      joined_at: member.joinedAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, session.access_token);
    await request(`/rest/v1/${invitationsTable}?id=eq.${encodeValue(invitation.id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        status: "accepted",
        accepted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    }, session.access_token);
  }

  async function updateCompanyMember(member) {
    const session = await activeSession();
    if (!session || !member?.id) return;
    await request(`/rest/v1/${membersTable}?id=eq.${encodeValue(member.id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        role: member.role,
        permissions: member.permissions || {},
        status: member.status || "active",
        updated_at: new Date().toISOString(),
      }),
    }, session.access_token);
  }

  window.KaishaRakuCloud = {
    enabled,
    readSession,
    touchSession,
    clearSession,
    sendOtp,
    verifyOtp,
    signOut,
    pullState,
    pushState,
    pullMemberships,
    pullInvitations,
    pullCompany,
    pullCompanyState,
    createCompany,
    pushCompanyState,
    inviteCompanyMember,
    acceptInvitation,
    updateCompanyMember,
  };
})();
