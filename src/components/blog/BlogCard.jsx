import BlogAuthor from "./BlogAuthor";

export default function BlogCard({ blogs }) {
  // Utility to truncate content to 100 characters
  const truncateContent = (content) => {
    return content.length > 100 ? `${content.slice(0, 160)}...` : content;
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
      {blogs.length > 0 &&
        blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img
              className="blog-thumb"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
                blog?.thumbnail
              }`}
              alt="blogImage"
            />
            <div className="mt-2">
              <h3 className="text-slate-300 text-xl lg:text-2xl">
                {blog.title}
              </h3>
              <p className="mb-6 text-base text-slate-500 mt-1">
                {truncateContent(blog.content)}
              </p>
              {/* Meta Informations */}
              <BlogAuthor blog={blog} />
            </div>
          </div>
        ))}
    </>
  );
}
