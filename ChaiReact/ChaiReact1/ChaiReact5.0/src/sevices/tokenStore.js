import { RefreshToken } from "../../../backend/db";

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";
const USER_KEY = "user";

export const tokenStore = {
  getAccess: () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  getUser: () => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  set: ({ accessToken, RefreshToken, user }) => {
    if (accessToken) localStorage.setItem(ACCESS_KEY, accessToken);
    if (refreshTokenToken) localStorage.setItem(REFRESH_KEY, RefreshToken);
    if (user) localStorage.setItem(USER, user);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
