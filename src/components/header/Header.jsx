import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useId } from "../../hooks/useId";
import { useProfile } from "../../hooks/useProfile";
import Login from "./Login";
import Logout from "./Logout";
import Search from "./Search";

export default function Header() {
  const { auth } = useAuth();
  const { state } = useProfile();
  const { setUserId } = useId();

  const navigate = useNavigate();

  const avatar = state?.avatar ?? auth?.user?.avatar;
  const isLoggedIn = auth?.token?.accessToken;

  // Generate initial for avatar if no avatar image is available
  const generateAvatarInitial = (firstName) => {
    return firstName ? firstName.charAt(0).toUpperCase() : "U";
  };

  const handleProfile = () => {
    // Assuming the user's ID is stored in auth.user.id
    const userId = auth?.user?.id;
    if (userId) {
      setUserId(userId);
      navigate(`/profile/${userId}`);
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
            {isLoggedIn && (
              <li>
                <Link
                  to="/create-blog"
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Write
                </Link>
              </li>
            )}
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
                    <div className="w-8 h-8 flex items-center justify-center bg-orange-600 text-white rounded-full">
                      <span>
                        {generateAvatarInitial(auth?.user?.firstName)}
                      </span>
                    </div>
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
