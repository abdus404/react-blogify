import { useNavigate } from "react-router-dom";
import { actions } from "../../actions";
import DeleteIcon from "../../assets/icons/delete.svg";
import useAxios from "../../hooks/useAxios";
import { useBlog } from "../../hooks/useBlog";
import { useProfile } from "../../hooks/useProfile";

export default function DeleteBlog({ blog }) {
  const { dispatch } = useBlog();
  const { api } = useAxios();
  const navigate = useNavigate();
  const { dispatch: profileDispatch } = useProfile();

  const handleDeleteBlog = async (event) => {
    event.stopPropagation();
    dispatch({ type: actions.blog.DATA_FETCHING });

    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}`
      );

      if (response.status === 200) {
        dispatch({
          type: actions.blog.BLOG_DELETED,
          data: blog.id,
        });
        profileDispatch({
          type: actions.profile.PROFILE_BLOG_DELETED,
          data: blog.id,
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.blog.DATA_FETCH_ERROR,
        error: response.error,
      });
    }
  };

  return (
    <button
      className="action-menu-item hover:text-red-500"
      onClick={handleDeleteBlog}
    >
      <img src={DeleteIcon} alt="Delete" />
      Delete
    </button>
  );
}
