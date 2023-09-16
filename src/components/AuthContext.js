// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {

  const [csrf_access_token, setCsrfAccessToken] = useState(
    JSON.parse(sessionStorage.getItem("csrf_access_token")) || ""
  );
  const [csrf_refresh_token, setCsrfRefreshToken] = useState(
    JSON.parse(sessionStorage.getItem("csrf_refresh_token")) || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(sessionStorage.getItem("isLoggedIn")) || false
  );

  const [memberId, setMemberId] = useState(
    JSON.parse(sessionStorage.getItem("memberId")) || ""
  );

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    sessionStorage.setItem("memberId", JSON.stringify(memberId));
  }, [memberId]);

  useEffect(() => {
    sessionStorage.setItem("csrf_access_token", JSON.stringify(csrf_access_token));
  }, [csrf_access_token]);

  useEffect(() => {
    sessionStorage.setItem("csrf_refresh_token", JSON.stringify(csrf_refresh_token));
  }, [csrf_refresh_token]);

  const memberIdSet = (id) => {
    setMemberId(id);
  };
  const memberIdClearn = () => {
    setMemberId(false);
  };

  const login = () => {
    // 在實際應用中，你可能會在此處執行實際的登入邏輯
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ csrf_refresh_token, setCsrfRefreshToken, csrf_access_token, setCsrfAccessToken, isLoggedIn, login, logout, memberId, memberIdSet, memberIdClearn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
