import { useNavigate } from "react-router-dom";
import { useId } from "../../hooks/useId";
import { formatDate } from "../../utils/formatDate";

export default function PostAuthor({ post }) {
  const navigate = useNavigate();
  const { setUserId } = useId();

  const handleProfile = () => {
    const userId = post?.author?.id;
    if (userId) {
      setUserId(userId);
      navigate(`/profile/${userId}`);
    }
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
    <div className="flex justify-between items-center">
      <button onClick={handleProfile}>
        <div className="flex items-center capitalize space-x-2">
          <div className="avater-img bg-indigo-600 text-white">
            <img
              className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                post?.author?.avatar
              }`}
              alt="Avatar"
            />
          </div>
          <div>
            <h5 className="text-slate-500 text-sm">{`${post?.author?.firstName} ${post?.author?.lastName}`}</h5>
            <div className="flex items-center text-xs text-slate-700">
              <span>{formatDate(post?.createdAt)}</span>
            </div>
          </div>
        </div>
      </button>
      <div className="text-sm px-2 py-1 text-slate-700">
        <span>{formatLikes(post?.likes?.length)}</span>
      </div>
    </div>
  );
}
