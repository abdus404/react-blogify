import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Logout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  function logout() {
    setAuth({});
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
