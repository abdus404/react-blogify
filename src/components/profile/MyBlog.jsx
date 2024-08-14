import { useProfile } from "../../hooks/useProfile";
import BlogCard from "../blog/BlogCard";

export default function MyBlog() {
  const { state } = useProfile();
  const blogs = state?.blogs;

  return (
    <div className="space-y-3 md:col-span-5">
      {/* Blog Card Start */}

      <BlogCard blogs={blogs} />
    </div>
  );
}
