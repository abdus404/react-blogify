import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LikeFilledIcon from "../../assets/icons/like-filled.svg";
import LikeIcon from "../../assets/icons/like.svg";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

export default function LikeButton({ blog }) {
  console.log(blog);
  const blogId = blog?.id;
  const { api } = useAxios();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const accessToken = auth?.token?.accessToken;
  const [liked, setLiked] = useState(
    blog?.likes?.some((like) => like.id === auth?.user?.id)
  );
  const [likesCount, setLikesCount] = useState(blog?.likes?.length);

  const handleLikeClick = async () => {
    if (accessToken) {
      try {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/like`
        );
        if (response.status === 200) {
          console.log(response.data);
          const isLiked = response.data.isLiked;
          setLiked(!liked);
          setLikesCount((prevCount) => prevCount + (isLiked ? 1 : -1));
        }
      } catch (error) {
        console.error(error);
        setLiked(false);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <li onClick={handleLikeClick}>
      <img src={liked ? LikeFilledIcon : LikeIcon} alt="like" />
      <span>{likesCount}</span>
    </li>
  );
}
