import { useProfile } from "../../hooks/useProfile";
import BlogCard from "../blog/BlogCard";

export default function MyBlog() {
  const { state } = useProfile();
  const blogs = state?.blogs;

  return (
    <div className="my-6 space-y-4">
      {/* Blog Card Start */}
      <BlogCard blogs={blogs} />
    </div>
  );
}
