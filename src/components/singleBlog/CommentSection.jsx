import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Comments from "./Comments";

export default function CommentSection({ blog }) {
  const { auth } = useAuth();
  const avatar = auth?.user?.avatar;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blog?.comments || []);
  const { api } = useAxios();
  const navigate = useNavigate();
  const accessToken = auth?.token?.accessToken;

  const addComment = async (event) => {
    if (accessToken) {
      if (!comment.trim()) {
        // Optionally show an error message or feedback here
        return;
      }

      try {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}/comment`,
          { content: comment } // Use 'content' as the key in the body
        );

        if (response.status === 200) {
          console.log(response.data);
          setComments(response?.data?.comments);
          setComment("");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">Comments (3)</h2>
        <div className="flex items -center space-x-4">
          <div className="avater-img bg-indigo-600 text-white">
            <img
              className="bg-orange-600 w-8 h-8 text-white grid place-items-center text-5xl rounded-full"
              src={`${
                import.meta.env.VITE_SERVER_BASE_URL
              }/uploads/avatar/${avatar}`}
              alt="Avatar"
            />
          </div>
          <div className="w-full">
            <textarea
              className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
              placeholder="Write a comment"
              type="text"
              name="content"
              id="content"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={addComment}
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
        {/* Comment One */}
        <Comments comments={comments} />
      </div>
    </section>
  );
}
