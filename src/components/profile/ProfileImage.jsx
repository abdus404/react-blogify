import { useState } from "react";
import { actions } from "../../actions";
import EditIcon from "../../assets/icons/edit.svg";
import ProfileAvatar from "../../assets/profileAvatar.png";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";

export default function ProfileImage() {
  const { state, dispatch } = useProfile();
  const { auth, setAuth } = useAuth();
  const isProfileOwner = state?.id === auth?.user?.id;
  const [loading, setLoading] = useState(false);
  const { api } = useAxios();
  const [avatarUrl, setAvatarUrl] = useState(
    `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${state?.avatar}`
  );

  // Function to handle file input change
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setLoading(true);

    try {
      // Send the file to the server via POST request
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
        formData
      );

      // Update the profile state with the new avatar URL
      if (response.status === 200) {
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data,
        });
        setAuth({
          ...auth,
          user: {
            ...auth.user, // Correcting reference to 'auth.user'
            avatar: response.data.user.avatar, // Update the avatar in auth state
          },
        });
        console.log(response.data.user.avatar);

        const newAvatarUrl = `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/uploads/avatar/${response.data.user.avatar}`;

        setAvatarUrl(newAvatarUrl);
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <div>
        {state?.avatar ? (
          <img
            className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full"
            src={avatarUrl}
            alt="Avatar"
          />
        ) : (
          <img
            className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full"
            src={ProfileAvatar}
            alt="Avatar"
          />
        )}
      </div>
      {isProfileOwner && (
        <>
          <button
            className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <img src={EditIcon} alt="Edit" />
          </button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
      {loading && <p className="absolute top-0 left-0">Uploading...</p>}
    </div>
  );
}
