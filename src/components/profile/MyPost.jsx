import { useProfile } from "../../hooks/useProfile";
import PostCard from "../post/PostCard";

export default function MyPost() {
  const { state } = useProfile();
  const posts = state?.blogs;

  return (
    <div className="my-6 space-y-4">
      {/* Blog Card Start */}
      <PostCard posts={posts} />
    </div>
  );
}
