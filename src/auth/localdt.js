// export function setToken(token) {
//   const maxAge = 3600; // 2 minutes
//   document.cookie = `token=${token}; Max-Age=${maxAge};`;
//   // document.cookie = `token=${token}; Max-Age=${maxAge}; Secure; HttpOnly; SameSite=Strict; Path=/`;
// }

export function setToken(token) {
  const maxAge = 3600; // 2 minutes
  document.cookie = `token=${token}; Max-Age=${maxAge};`;
  setTimeout(() => {
    localStorage.clear();
    window.location.reload();
  }, maxAge * 1000); // konversi detik ke milidetik
  // document.cookie = `token=${token}; Max-Age=${maxAge}; Secure; HttpOnly; SameSite=Strict; Path=/`;
}

export function getTokenFromCookie() {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';').map(cookie => cookie.trim());
  
  for (const cookie of cookies) {
    if (cookie.startsWith('token=')) {
      return cookie.split('=')[1];
    }
  }
  
  return null;
}

export function removeToken() {
  const keysToRemove = ["rekCache", "payCache", "rolesCache", "rekProf", "orderCache"];
  document.cookie = 'token=; Max-Age=0;';
  keysToRemove.forEach((key) => {
    localStorage.removeItem(key);
  });
  // document.cookie = 'token=; Max-Age=0; Secure; HttpOnly; SameSite=Strict; Path=/';
}
