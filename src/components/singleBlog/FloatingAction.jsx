import CommentIcon from "../../assets/icons/comment.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import LikeIcon from "../../assets/icons/like.svg";

export default function FloatingAction() {
  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <img src={LikeIcon} alt="like" />
          <span>10</span>
        </li>
        <li>
          {/* There is heart-filled.svg in the icons folder */}
          <img src={CommentIcon} alt="Favourite" />
        </li>
        <a href="#comments">
          <li>
            <img src={HeartIcon} />
            <span>3</span>
          </li>
        </a>
      </ul>
    </div>
  );
}
