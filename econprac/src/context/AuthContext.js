import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  loginUser as lsLogin,
  registerUser as lsRegister,
  getCurrentUser as lsGetCurrentUser,
  setCurrentUser as lsSetCurrentUser,
  logoutUser as lsLogoutUser
} from '../utils/localStorageHelpers';

// Create context
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  // user: { id, name, email } or null
  const [user, setUser] = useState(() => lsGetCurrentUser());

  // Keep in sync if localStorage is modified in another tab/window
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'currentUser') {
        setUser(lsGetCurrentUser());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // API: login(email, password)
  // returns the logged-in user object on success or throws on failure
  const login = async (email, password) => {
    // call the helper that validates credentials and returns public user shape
    const u = await lsLogin(email, password);
    // persist session
    lsSetCurrentUser(u);
    setUser(u);
    return u;
  };

  // API: register(name, email, password)
  // returns new user object (public shape) or throws on failure
  const register = async (name, email, password) => {
    const u = await lsRegister(name, email, password);
    // optionally auto-login after register:
    lsSetCurrentUser(u);
    setUser(u);
    return u;
  };

  // API: logout()
  const logout = () => {
    lsLogoutUser();
    setUser(null);
  };

  // Expose user + actions
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return ctx;
};

export default AuthContext;