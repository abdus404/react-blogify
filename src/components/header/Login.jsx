import { Link } from "react-router-dom";

export default function Login() {
  return (
    <li>
      <Link
        to="/login"
        className="text-white/50 hover:text-white transition-all duration-200"
      >
        Login
      </Link>
    </li>
  );
}
