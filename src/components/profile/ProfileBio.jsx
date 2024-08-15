import { useState } from "react";
import { actions } from "../../actions";
import CheckIcon from "../../assets/icons/check.png";
import EditIcon from "../../assets/icons/edit.svg";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";

export default function ProfileBio() {
  const { state, dispatch } = useProfile();
  const { auth } = useAuth();
  const isProfileOwner = state?.id === auth?.user?.id;
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(state?.bio || "");
  const { api } = useAxios();

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
        { bio }
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data.user.bio,
        });
        setBio(response.data.user.bio); // Update local bio state
      }
      setEditMode(false);
    } catch (err) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: err.message,
      });
    }
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">{bio}</p>
        ) : (
          <textarea
            className="p-2 leading-[188%] text-gray-600 lg:text-lg rounded-md"
            value={bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
      {isProfileOwner && (
        <>
          {!editMode ? (
            <button
              className="flex-center h-7 w-7 rounded-full cursor-pointer"
              onClick={() => setEditMode(true)}
            >
              <img src={EditIcon} alt="Edit" />
            </button>
          ) : (
            <button
              className="flex-center h-7 w-7 rounded-full"
              onClick={handleBioEdit}
            >
              <img src={CheckIcon} alt="Check" />
            </button>
          )}
        </>
      )}
    </div>
  );
}
