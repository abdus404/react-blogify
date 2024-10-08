import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context";

export default function useAuth() {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) =>
    auth?.token?.accessToken ? "User logged in" : "User logged out"
  );
  return useContext(AuthContext);
}
