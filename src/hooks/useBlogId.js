import { useContext } from "react";
import { BlogIdContext } from "../context";

export const useBlogId = () => {
  return useContext(BlogIdContext);
};
