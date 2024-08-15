import { useState } from "react";
import { EditBlogContext } from "../context";

export default function EditBlogProvider({ children }) {
  const [editBlog, setEditBlog] = useState(null);
  return (
    <EditBlogContext.Provider value={{ editBlog, setEditBlog }}>
      {children}
    </EditBlogContext.Provider>
  );
}
