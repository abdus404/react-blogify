import { useBlog } from "../../hooks/useBlog";
import BlogCard from "./BlogCard";

export default function BlogContent() {
  const { state } = useBlog();
  const blogs = state?.blogs;

  if (state?.loading) {
    return <div> We are working...</div>;
  }

  if (state?.error) {
    return <div> Error in fatching blogs {state?.error?.message}</div>;
  }

  return (
    <div className="space-y-3 md:col-span-5">
      <BlogCard blogs={blogs} />
    </div>
  );
}
