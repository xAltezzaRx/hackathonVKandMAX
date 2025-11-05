export type Tokens = { access_token: string; refresh_token: string; token_type: string };

export function saveTokens(t: Tokens) {
  localStorage.setItem('access', t.access_token);
  localStorage.setItem('refresh', t.refresh_token);
}

export function accessToken(): string | null { return localStorage.getItem('access'); }
export function refreshToken(): string | null { return localStorage.getItem('refresh'); }
export function logout() { localStorage.removeItem('access'); localStorage.removeItem('refresh'); }
