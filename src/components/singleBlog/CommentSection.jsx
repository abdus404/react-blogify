import useAuth from "../../hooks/useAuth";
import Comments from "./Comments";

export default function CommentSection({ comments }) {
  const { auth } = useAuth();
  const avatar = auth?.user?.avatar;

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
              defaultValue={""}
            />
            <div className="flex justify-end mt-4">
              <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
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
