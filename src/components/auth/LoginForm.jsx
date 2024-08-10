import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Field from "../common/Feild";

export default function LoginForm() {
  const { setAuthData, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  async function submitForm(formData) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );
      if (response.status === 200) {
        const data = response.data;
        if (data) {
          const { user, token } = data;
          const username = `${user.firstName} ${user.lastName}`;
          const avatar = user.avatar;
          const accessToken = token.accessToken;
          const refreshToken = token.refreshToken;

          // Set expiration times in hours
          const accessTokenExpiryHours = 2; // 2 hours
          const refreshTokenExpiryHours = 24; // 1 day

          // Set cookies for user info
          Cookies.set("username", username, {
            expires: refreshTokenExpiryHours / 24,
            secure: true,
          });
          Cookies.set("avatar", avatar, {
            expires: refreshTokenExpiryHours / 24,
            secure: true,
          });

          // Set cookies for tokens
          Cookies.set("accessToken", accessToken, {
            expires: accessTokenExpiryHours / 24,
            secure: true,
          });

          Cookies.set("refreshToken", refreshToken, {
            expires: refreshTokenExpiryHours / 24,
            secure: true,
          });

          setAuthData({ username, avatar, accessToken, refreshToken });
          setIsLoggedIn(true);

          console.log("User data stored in cookies");

          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found`,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email address is required" })}
          className={`w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500  ${
            !!errors.email ? "border-red-500" : "border-gray-200"
          }`}
          type="email"
          id="email"
          name="email"
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className={`w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500 ${
            !!errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="password"
          id="password"
          name="password"
        />
      </Field>
      <p className="mb-4 text-red-600">{errors?.root?.random?.message}</p>
      <div className="mb-6">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Login
        </button>
      </div>
      <p className="text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
