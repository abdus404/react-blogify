import { useContext } from "react";
import { EditBlogContext } from "../context";

export const useEditBlog = () => {
  return useContext(EditBlogContext);
};
