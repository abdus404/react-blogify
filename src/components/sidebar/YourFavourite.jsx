import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

export default function YourFavourite() {
  const [blogs, setBlogs] = useState("");
  const { api } = useAxios();
  const { auth } = useAuth();

  const accessToken = auth?.token?.accessToken;

  useEffect(() => {
    const fetchblog = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
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

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favourites ❤️
      </h3>
      {accessToken ? (
        <ul className="space-y-5 my-5">
          {blogs.length > 0 &&
            blogs.map((blog) => (
              <li key={blog?.id}>
                <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                  {blog?.title}
                </h3>
                <p className="text-slate-600 text-sm">{blog?.tags}</p>
              </li>
            ))}
        </ul>
      ) : (
        <p className="mt-6 text-gray-400 font-medium">
          Please login to add blogs
        </p>
      )}
    </div>
  );
}
