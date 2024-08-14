import axios from "axios";
import { useEffect } from "react";
import { actions } from "../actions";
import BlogContent from "../components/blog/BlogContent";
import Sidebar from "../components/sidebar/Sidebar";
import { useBlog } from "../hooks/useBlog";

export default function HomePage() {
  const { state, dispatch } = useBlog();

  useEffect(() => {
    dispatch({ type: actions.blog.DATA_FETCHING });

    const fetchblog = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs?page=1`
        );
        if (response.status === 200) {
          dispatch({
            type: actions.blog.DATA_FETCHED,
            data: response.data.blogs,
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.blog.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchblog();
  }, []);

  if (state?.loading) {
    return <div> We are working...</div>;
  }

  if (state?.error) {
    return <div> Error in fatching blogs {state?.error?.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      <BlogContent />
      <Sidebar />
    </div>
  );
}
