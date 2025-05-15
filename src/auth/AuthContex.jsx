// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getTokenFromCookie } from './localdt';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  // Cek apakah token ada di localStorage saat aplikasi dimuat
  useEffect(() => {
    const token = getTokenFromCookie();
    if (token) {
      setIsLogin(true);
    }
    
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
