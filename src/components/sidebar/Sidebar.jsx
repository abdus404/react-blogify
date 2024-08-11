import MostPopular from "./MostPopular";
import YourFavourite from "./YourFavourite";

export default function Sidebar() {
  return (
    <div className="md:col-span-2 h-full w-full space-y-5">
      <MostPopular />
      <YourFavourite />
    </div>
  );
}
