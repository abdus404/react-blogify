import { useContext } from "react";
import { UserIdContext } from "../context";

export const useUserId = () => {
  return useContext(UserIdContext);
};
