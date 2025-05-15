import { getTokenFromCookie } from "./localdt";

// auth.js
export function checkAuth(navigate) {
  const token = getTokenFromCookie();

  if (!token || token === 'Unauthorized' || token === null) {
    navigate('/login');
  }
}
