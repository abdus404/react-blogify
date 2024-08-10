import { useEffect } from "react";
import { actions } from "../actions";
import MyPost from "../components/profile/MyPost";
import ProfileBio from "../components/profile/ProfileBio";
import ProfileImage from "../components/profile/ProfileImage";
import ProfileInfo from "../components/profile/ProfileInfo";
import useAxios from "../hooks/useAxios";
import { useId } from "../hooks/useId";
import { useProfile } from "../hooks/useProfile";

export default function ProfilePage() {
  const { api } = useAxios();
  const { userId } = useId();
  const { state, dispatch } = useProfile();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${userId}`
        );
        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div> Fetching your profile data...</div>;
  }

  return (
    <div className="mx-auto max-w-[1020px] py-8">
      <div className="flex flex-col items-center py-8 text-center">
        <ProfileImage />
        <ProfileInfo />
        <ProfileBio />
        <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
      </div>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
      <MyPost />
    </div>
  );
}
