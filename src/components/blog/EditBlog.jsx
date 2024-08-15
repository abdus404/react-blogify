import { useNavigate } from "react-router-dom";
import EditIcon from "../../assets/icons/edit.svg";
import { useEditBlog } from "../../hooks/useEditBlog";

export default function EditBlog({ blog }) {
  const navigate = useNavigate();
  const { setEditBlog } = useEditBlog();

  const handleEditBlog = async (event) => {
    event.stopPropagation();
    setEditBlog(blog);
    navigate("/edit-blog");
  };

  return (
    <button
      className="action-menu-item hover:text-lwsGreen"
      onClick={handleEditBlog}
    >
      <img src={EditIcon} alt="Edit" />
      Edit
    </button>
  );
}
