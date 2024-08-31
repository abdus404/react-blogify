import { Link, useNavigate } from "react-router-dom";
import profileAvatar from "../../assets/profileAvatar.png";
import useAuth from "../../hooks/useAuth";
import { useUserId } from "../../hooks/useUserId";
import Login from "./Login";
import Logout from "./Logout";
import Search from "./Search";

export default function Header() {
  const { auth } = useAuth();
  const { setUserId } = useUserId();

  const navigate = useNavigate();

  const avatar = auth?.user?.avatar;
  const isLoggedIn = auth?.token?.accessToken;

  const handleProfile = () => {
    // Assuming the user's ID is stored in auth.user.id
    const userId = auth?.user?.id;
    if (userId) {
      setUserId(userId);
      navigate(`/profile/${userId}`);
    } else {
      navigate(`/login`);
    }
  };

  const handleWrite = () => {
    if (isLoggedIn) {
      navigate(`/create-blog`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <header>
      <nav className="container">
        {/* Logo */}
        <div>
          <Link to="/">
            <h1 className="text-2xl font-semibold">React Blogify</h1>
          </Link>
        </div>
        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <button
                onClick={handleWrite}
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </button>
            </li>
            <Search />
            {isLoggedIn ? <Logout /> : <Login />}
            <li className="flex items-center" onClick={handleProfile}>
              {isLoggedIn && (
                <>
                  {avatar ? (
                    <img
                      src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                      }/uploads/avatar/${avatar}`}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <img
                      src={profileAvatar}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <Link to="/profile">
                    <span className="text-white ml-2">
                      {`${auth?.user?.firstName} ${auth?.user?.lastName}`}
                    </span>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
