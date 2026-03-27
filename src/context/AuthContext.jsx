import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('recraft_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  function login(userData) {
    const u = { name: userData.name, email: userData.email, initials: userData.name.slice(0, 2).toUpperCase(), ecoPoints: 0, level: 1 };
    localStorage.setItem('recraft_user', JSON.stringify(u));
    setUser(u);
  }

  function logout() {
    localStorage.removeItem('recraft_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
