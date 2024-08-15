import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThreeDotIcon from "../../assets/icons/3dots.svg";
import useAuth from "../../hooks/useAuth";
import { useBlogId } from "../../hooks/useBlogId";
import BlogAuthor from "./BlogAuthor";
import DeleteBlog from "./DeleteBlog";
import EditBlog from "./EditBlog";

export default function BlogCard({ blogs }) {
  const [popupBlogId, setPopupBlogId] = useState(null);
  const navigate = useNavigate();
  const { setBlogId } = useBlogId();
  const { auth } = useAuth();

  const userId = auth?.user?.id;

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

  // Utility to truncate content to 100 characters
  const truncateContent = (content) => {
    return content?.length > 100 ? `${content?.slice(0, 160)}...` : content;
  };

  const handleBlogClick = (blogId) => {
    setBlogId(blogId);
    navigate(`/blogs/${blogId}`);
  };

  const handlePopup = (event, blogId) => {
    event.stopPropagation();
    setPopupBlogId(popupBlogId === blogId ? null : blogId);
  };

  // Sort blogs by date in descending order (assuming a createdAt field)
  const sortedBlogs = blogs.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      {sortedBlogs.length > 0 &&
        sortedBlogs.map((blog) => (
          <div
            key={blog?.id}
            className="blog-card"
            onClick={() => handleBlogClick(blog.id)}
          >
            <img
              className="blog-thumb"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
                blog?.thumbnail
              }`}
              alt="blogImage"
            />
            <div className="mt-2 relative">
              <h3 className="text-slate-300 text-xl lg:text-2xl">
                {blog.title}
              </h3>
              <p className="mb-6 text-base text-slate-500 mt-1">
                {truncateContent(blog?.content)}
              </p>
              {/* Meta Informations */}
              <BlogAuthor blog={blog} />
              {userId === blog?.author?.id && (
                <div className="absolute right-0 top-0">
                  <button onClick={(event) => handlePopup(event, blog.id)}>
                    <img src={ThreeDotIcon} alt="3dots of Action" />
                  </button>
                  {/* Action Menus Popup */}
                  {popupBlogId === blog?.id && (
                    <div className="action-modal-container">
                      <EditBlog blog={blog} />
                      <DeleteBlog blog={blog} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
    </>
  );
}
