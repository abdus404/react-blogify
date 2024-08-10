import { useEffect, useState } from "react";
import { AuthContext } from "../context";
import getAuthCookies from "../utils/getAuthCookies";

export default function AuthProvider({ children }) {
  const [authData, setAuthData] = useState({
    username: "",
    avatar: "",
    accessToken: "",
    refreshToken: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const { username, avatar, accessToken, refreshToken } = getAuthCookies();
    if (accessToken) {
      setAuthData({ username, avatar, accessToken, refreshToken });
      setIsLoggedIn(true);
    } else {
      setAuthData({ username: "", avatar: "" });
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authData, setAuthData, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
