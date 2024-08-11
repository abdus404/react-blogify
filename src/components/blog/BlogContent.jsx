import { useBlog } from "../../hooks/useBlog";
import BlogCard from "./BlogCard";

export default function BlogContent() {
  const { state } = useBlog();
  const blogs = state?.blogs;
  return (
    <div className="space-y-3 md:col-span-5">
      <BlogCard blogs={blogs} />
    </div>
  );
}
