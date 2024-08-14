import { useNavigate } from "react-router-dom";
import { useBlogId } from "../../hooks/useBlogId";

export default function SearchResultCard({ blogs }) {
  const { setBlogId } = useBlogId();
  const navigate = useNavigate();

  const truncateContent = (content) => {
    return content.length > 100 ? `${content.slice(0, 160)}...` : content;
  };

  const handleBlogClick = (blogId) => {
    console.log(blogId);
    setBlogId(blogId);
    navigate(`/blogs/${blogId}`);
  };

  return (
    <>
      {blogs?.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog?.id}
            className="flex gap-6 py-2 cursor-pointer"
            onClick={() => handleBlogClick(blog.id)}
          >
            <img
              className="h-28 object-contain"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
                blog?.thumbnail
              }`}
              alt="blogImage"
            />
            <div className="mt-2">
              <h3 className="text-slate-300 text-xl font-bold">
                {blog?.title}
              </h3>
              {/* Meta Informations */}
              <p className="mb-6 text-sm text-slate-500 mt-1">
                {truncateContent(blog?.content)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-slate-400">No results found</p>
      )}
    </>
  );
}
