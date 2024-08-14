import { Link } from "react-router-dom";
import SearchIcon from "../../assets/icons/search.svg";

export default function Search() {
  return (
    <li>
      <Link to={"/search"} className="flex items-center gap-2 cursor-pointer">
        <img src={SearchIcon} alt="Search" />
        <span>Search</span>
      </Link>
    </li>
  );
}
