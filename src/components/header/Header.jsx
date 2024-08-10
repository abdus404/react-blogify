import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Login from "./Login";
import Logout from "./Logout";
import Search from "./Search";

export default function Header() {
  const { authData, isLoggedIn } = useAuth();

  console.log(authData);

  // Generate initial for avatar if no avatar image is available
  const generateAvatarInitial = (username) => {
    return username ? username.charAt(0).toUpperCase() : "U";
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
            <li className="flex items-center">
              {isLoggedIn && (
                <>
                  {authData?.avatar ? (
                    <img
                      src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                      }/uploads/avatar/${authData.avatar}`}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-orange-600 text-white rounded-full">
                      <span>{generateAvatarInitial(authData?.username)}</span>
                    </div>
                  )}
                  <Link to="/profile">
                    <span className="text-white ml-2">
                      {authData?.username}
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
