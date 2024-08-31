import { useNavigate } from "react-router-dom";
import profileAvatar from "../../assets/profileAvatar.png";
import { useUserId } from "../../hooks/useUserId";
import { formatDate } from "../../utils/formatDate";

export default function BlogAuthor({ blog }) {
  const navigate = useNavigate();
  const { setUserId } = useUserId();

  const handleProfileClick = (event, userId) => {
    event.stopPropagation();
    console.log(userId);
    setUserId(userId);
    navigate(`/profile/${userId}`);
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
  console.log(blog);

  return (
    <div className="flex justify-between items-center">
      <div
        onClick={(event) => handleProfileClick(event, blog?.author?.id)}
        className="flex items-center capitalize space-x-2"
      >
        <div className="avater-img bg-indigo-600 text-white">
          {blog?.author?.avatar ? (
            <img
              className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                blog?.author?.avatar
              }`}
              alt="Avatar"
            />
          ) : (
            <img
              className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full"
              src={profileAvatar}
              alt="Avatar"
            />
          )}
        </div>
        <div>
          <h5 className="text-slate-500 text-sm">{`${blog?.author?.firstName} ${blog?.author?.lastName}`}</h5>
          <div className="flex items-center text-xs text-slate-700">
            <span>{formatDate(blog?.createdAt)}</span>
          </div>
        </div>
      </div>
      <div className="text-sm px-2 py-1 text-slate-700">
        <span>{formatLikes(blog?.likes?.length)}</span>
      </div>
    </div>
  );
}
