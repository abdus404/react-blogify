import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { actions } from "../actions";
import Field from "../components/common/Feild";
import useAxios from "../hooks/useAxios";
import { useBlog } from "../hooks/useBlog";
// import { useBlogId } from "../hooks/useBlogId";

export default function CreateBlog() {
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();
  // const { setBlogId } = useBlogId();
  const { api } = useAxios();
  const { state, dispatch } = useBlog();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  // Function to handle file selection
  const handleFileChange = (event) => {
    setThumbnail(event.target.files[0]);
  };

  const submitForm = async (data) => {
    dispatch({ type: actions.blog.DATA_FETCHING });

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("tags", data.tags);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`,
        formData
      );

      if (response.status === 201) {
        dispatch({
          type: actions.blog.DATA_CREATED,
          data: response.data,
        });
        // setBlogId(response?.data?.blog?.id);
        // navigate(`/blogs/${response?.data?.blog?.id}`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.blog.DATA_FETCH_ERROR,
        error: error.response ? error.response.data : error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="createBlog">
      <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
        <label
          htmlFor="thumbnail"
          className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <p>Upload Your Image</p>
        </label>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <Field error={errors.title}>
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          id="title"
          name="title"
          placeholder="Enter your blog title"
        />
      </Field>
      <Field error={errors.tags}>
        <input
          {...register("tags")}
          type="text"
          id="tags"
          name="tags"
          placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
        />
      </Field>
      <Field error={errors.content}>
        <textarea
          {...register("content", { required: "Content is required" })}
          id="content"
          name="content"
          placeholder="Write your blog content"
          rows={8}
          defaultValue={""}
        />
      </Field>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
      >
        Create Blog
      </button>
    </form>
  );
}
