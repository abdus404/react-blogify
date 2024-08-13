import { useState } from "react";
import { BlogIdContext } from "../context";

export default function BlogIdProvider({ children }) {
  const [blogId, setBlogId] = useState({});
  return (
    <BlogIdContext.Provider value={{ blogId, setBlogId }}>
      {children}
    </BlogIdContext.Provider>
  );
}
