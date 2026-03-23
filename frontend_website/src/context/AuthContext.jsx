import { createContext, useContext, useState, useEffect } from "react";
import {
  loginApi,
  logoutApi,
  getCurrentUser,
} from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getCurrentUser();
    if (u) setUser(u);
  }, []);

  const login = async (email, password) => {
    const u = await loginApi(email, password);
    setUser(u);
    return u;
  };

  const logout = () => {
    logoutApi();
    setUser(null);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    role: user?.role || null,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}