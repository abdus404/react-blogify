import EditIcon from "../../assets/icons/edit.svg";

export default function EditBlog() {
  return (
    <button className="action-menu-item hover:text-lwsGreen">
      <img src={EditIcon} alt="Edit" />
      Edit
    </button>
  );
}
