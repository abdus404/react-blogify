import { formatDate } from "../../utils/formatDate";

export default function PostSection({ blog }) {
  const { title, content, thumbnail, author, tags, likes, createdAt } = blog;

  // Convert the tags string into an array
  const tagsArray = tags ? tags.split(", ") : [];

  // Utility to format like count text
  const formatLikes = (likeCount) => {
    if (likeCount === 0) {
      return "0 Likes";
    } else if (likeCount === 1) {
      return "1 Like";
    } else {
      return `${likeCount} Likes`;
    }
  };

  return (
    <section>
      <div className="container text-center py-8">
        <h1 className="font-bold text-3xl md:text-5xl">{title}</h1>
        <div className="flex justify-center items-center my-4 gap-4">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-indigo-600 text-white">
              <img
                className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                  author?.avatar
                }`}
                alt="Avatar"
              />
            </div>
            <h5 className="text-slate-500 text-sm">{`${author?.firstName} ${author?.lastName}`}</h5>
          </div>
          <span className="text-sm text-slate-700 dot">
            {formatDate(createdAt)}
          </span>
          <span className="text-sm text-slate-700 dot">
            {formatLikes(likes?.length || 0)}
          </span>
        </div>
        <img
          className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
          src={`${
            import.meta.env.VITE_SERVER_BASE_URL
          }/uploads/blog/${thumbnail}`}
          alt="blogImage"
        />
        {/* Tags */}
        <ul className="tags">
          {tagsArray.length > 0 &&
            tagsArray.map((tag, index) => (
              <li
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2"
              >
                {tag}
              </li>
            ))}
        </ul>
        {/* Content */}
        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
          {content}
        </div>
      </div>
    </section>
  );
}
