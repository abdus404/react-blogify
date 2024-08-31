import { useNavigate } from "react-router-dom";
import CommentIcon from "../../assets/icons/comment.svg";
import useAuth from "../../hooks/useAuth";
import FavouriteButton from "./FavouriteButton";
import LikeButton from "./LikeButton";

export default function FloatingAction({ blog }) {
  const { auth } = useAuth();
  const accessToken = auth?.token?.accessToken;
  const navigate = useNavigate();

  const handleClick = () => {
    if (!accessToken) {
      navigate("/login");
    }
  };

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <LikeButton blog={blog} />
        <FavouriteButton blog={blog} />
        <a href="#comments">
          <li onClick={handleClick}>
            <img src={CommentIcon} />
            <span>{blog?.comments?.length}</span>
          </li>
        </a>
      </ul>
    </div>
  );
}
