import EditIcon from "../../assets/icons/edit.svg";
import useAuth from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";

export default function ProfileBio() {
  const { state } = useProfile();
  const { auth } = useAuth();
  const isProfileWoner = state?.id === auth?.user?.id;

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        <p className="leading-[188%] text-gray-400 lg:text-lg">{state?.bio}</p>
      </div>
      {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
      {isProfileWoner && (
        <button className="flex-center h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80 grid place-items-center">
          <img src={EditIcon} alt="Edit" />
        </button>
      )}
    </div>
  );
}
