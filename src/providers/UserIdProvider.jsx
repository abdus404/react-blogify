import { useState } from "react";
import { UserIdContext } from "../context";

export default function UserIdProvider({ children }) {
  const [userId, setUserId] = useState({});
  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
}
