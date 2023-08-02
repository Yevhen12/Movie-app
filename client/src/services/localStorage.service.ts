const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';
const USER_ID_KEY = 'user-local-id';

export type SetTokensProps = {
  expiresIn?: number;
  access_token: string;
  _id: string;
  refresh_token: string;
};

export function setTokens({ expiresIn = 3600, access_token, _id, refresh_token }: SetTokensProps) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;

  localStorage.setItem(TOKEN_KEY, access_token);
  localStorage.setItem(REFRESH_KEY, refresh_token);
  localStorage.setItem(EXPIRES_KEY, expiresDate.toString());
  localStorage.setItem(USER_ID_KEY, _id);
}

export function getAccessToken() {
  if (typeof window !== 'undefined') { 
    return localStorage.getItem(TOKEN_KEY);
  }
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
  return localStorage.getItem(USER_ID_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
};

export default localStorageService;