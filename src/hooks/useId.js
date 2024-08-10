import { useContext } from "react";
import { UserIdContext } from "../context";

export const useId = () => {
  return useContext(UserIdContext);
};
