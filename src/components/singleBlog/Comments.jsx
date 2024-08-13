export default function Comments({ comments }) {
  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment?.id} className="flex items-start space-x-4 my-8">
            <div className="avatar-img text-white">
              <img
                className="bg-orange-600 w-8 h-8 text-white grid place-items-center text-5xl rounded-full"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                  comment?.author?.avatar
                }`}
                alt="Avatar"
              />
            </div>
            <div className="w-full">
              <h5 className="text-slate-500 font-bold">
                {comment?.author?.firstName} {comment?.author?.lastName}
              </h5>
              <p className="text-slate-300">{comment?.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-slate-500">No comments available.</p>
      )}
    </>
  );
}
