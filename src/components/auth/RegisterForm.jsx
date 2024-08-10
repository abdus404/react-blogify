import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Field from "../common/Feild";

export default function RegisterForm() {
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
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message}`,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", { required: "First Name is required" })}
          className={`w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500  ${
            !!errors.firstName ? "border-red-500" : "border-gray-200"
          }`}
          type="text"
          id="firstName"
          name="firstName"
        />
      </Field>
      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName", { required: "Last Name is required" })}
          className={`w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500  ${
            !!errors.lastName ? "border-red-500" : "border-gray-200"
          }`}
          type="text"
          id="lastName"
          name="lastName"
        />
      </Field>
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
          Create Account
        </button>
      </div>
      <p className="text-center">
        Already have account?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
