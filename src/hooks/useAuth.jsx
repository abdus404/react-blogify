import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context";

export default function useAuth() {
  const { authData } = useContext(AuthContext);
  useDebugValue(authData, (auth) =>
    auth?.username ? "User logged in" : "User logged out"
  );
  return useContext(AuthContext);
}
