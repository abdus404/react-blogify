import Cookies from "js-cookie";

export default function getAuthCookies() {
  const username = Cookies.get("username");
  const avatar = Cookies.get("avatar");
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  return { username, avatar, accessToken };
}
