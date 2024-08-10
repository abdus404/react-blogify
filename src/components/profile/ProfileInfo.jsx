import { useProfile } from "../../hooks/useProfile";

export default function ProfileInfo() {
  const { state } = useProfile();

  return (
    <div>
      <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
        {`${state?.firstName} ${state.lastName}`}
      </h3>
      <p className="leading-[231%] lg:text-lg">{state?.email}</p>
    </div>
  );
}
