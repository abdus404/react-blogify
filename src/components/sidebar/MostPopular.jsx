import axios from "axios";
import { useEffect, useState } from "react";

export default function MostPopular() {
  const [blogs, setBlogs] = useState("");

  useEffect(() => {
    const fetchblog = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
        );
        if (response.status === 200) {
          const blogs = response.data.blogs;
          setBlogs(blogs);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchblog();
  }, []);

  const formatLikes = (likeCount) => {
    if (likeCount === 0) {
      return "0 Likes";
    } else if (likeCount === 1) {
      return "1 Like";
    } else {
      return `${likeCount} Likes`;
    }
  };

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>
      <ul className="space-y-5 my-5">
        {blogs.length > 0 &&
          blogs.map((blog) => (
            <li key={blog?.id}>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                {blog?.title}
              </h3>
              <p className="text-slate-600 text-sm">
                by
                <a href="./profile.html">{`${blog?.author?.firstName} ${blog?.author?.lastName}`}</a>{" "}
                <span>{formatLikes(blog?.likes?.length)}</span>
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}
