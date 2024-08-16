import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeartFilledIcon from "../../assets/icons/heart-filled.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";

export default function FavouriteButton({ blog }) {
  const { api } = useAxios();
  const { auth } = useAuth();
  const { state } = useProfile();
  const navigate = useNavigate();
  const accessToken = auth?.token?.accessToken;
  const [isFavourite, setIsFavourite] = useState(
    state?.favourites?.some((favourite) => favourite.id === blog?.id)
  );

  const handleLikeClick = async () => {
    if (accessToken) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog?.id}/favourite`
        );
        if (response.status === 200) {
          setIsFavourite(!isFavourite);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <li onClick={handleLikeClick}>
      <img src={isFavourite ? HeartFilledIcon : HeartIcon} alt="Favourite" />
    </li>
  );
}
