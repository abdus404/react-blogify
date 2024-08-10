import PostAuthor from "./PostAuthor";

export default function PostCard({ posts }) {
  // Utility to truncate content to 100 characters
  const truncateContent = (content) => {
    return content.length > 100 ? `${content.slice(0, 200)}...` : content;
  };

  // Utility to format like count text
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
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post.id} className="blog-card">
            <img
              className="blog-thumb"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
                post?.thumbnail
              }`}
              alt="postImage"
            />
            <div className="mt-2">
              <h3 className="text-slate-300 text-xl lg:text-2xl">
                {post.title}
              </h3>
              <p className="mb-6 text-base text-slate-500 mt-1">
                {truncateContent(post.content)}
              </p>
              {/* Meta Informations */}
              <PostAuthor post={post} />
            </div>
          </div>
        ))}
    </>
  );
}
