import CommentIcon from "../../assets/icons/comment.svg";
import FavouriteButton from "./FavouriteButton";
import LikeButton from "./LikeButton";

export default function FloatingAction({ blog }) {
  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <LikeButton blog={blog} />
        <FavouriteButton blog={blog} />
        <a href="#comments">
          <li>
            <img src={CommentIcon} />
            <span>3</span>
          </li>
        </a>
      </ul>
    </div>
  );
}
