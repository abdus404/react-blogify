import { useEffect, useState } from "react";
import CommentSection from "../components/singleBlog/CommentSection";
import FloatingAction from "../components/singleBlog/FloatingAction";
import PostSection from "../components/singleBlog/PostSection";
import useAxios from "../hooks/useAxios";
import { useBlogId } from "../hooks/useBlogId";

export default function SingleBlogPage() {
  const [blog, setBlog] = useState(null);
  const { api } = useAxios();
  const { blogId } = useBlogId();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Simulate a delay (e.g., 1 second)
        await new Promise((resolve) => setTimeout(resolve, 600));

        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
        );
        if (response.status === 200) {
          setBlog(response.data);
        } else {
          console.error("Failed to fetch blog:", response.status);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId, api]); // Ensure `api` is included in the dependency array

  if (!blog) {
    return <p>Loading...</p>; // Handle loading state
  }

  return (
    <>
      <main>
        <PostSection blog={blog} />
        <CommentSection blog={blog} />
      </main>
      <FloatingAction blog={blog} />
    </>
  );
}
