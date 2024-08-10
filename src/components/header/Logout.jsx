import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Logout() {
  const { setAuthData, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  function logout() {
    Cookies.remove("username");
    Cookies.remove("avatar");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    console.log("User logged out");
    setAuthData({
      username: "",
      avatar: "",
      accessToken: "",
      refreshToken: "",
    });
    setIsLoggedIn(false);
    navigate("/login");
  }
  return (
    <button
      onClick={logout}
      className="text-white/50 hover:text-white transition-all duration-200"
    >
      Logout
    </button>
  );
}
