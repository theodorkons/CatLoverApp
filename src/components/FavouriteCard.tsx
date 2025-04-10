import HeartIcon from "./icons/HeartIcon";
import { useFavourite } from "../hooks/useFavourites";
import CatImage from "./CatImage";

interface Props {
  id: number;
  imageId: string;
  imageUrl: string;
}

export default function FavouriteCard({ id, imageId, imageUrl }: Props) {
  const { isFavorited, handleHeartClick } = useFavourite(imageId, id);

  return (
    <div key={id} className="relative overflow-hidden">
      <div className="absolute cursor-pointer top-0 left-0 w-full h-16 bg-gradient-to-b from-black/30 to-transparent z-10" />
      <div
        onClick={() => handleHeartClick()}
        className="absolute top-2 right-4 w-6 h-6 hover:scale-120 z-20"
      >
        <HeartIcon
          fill={isFavorited ? "red" : "white"}
          stroke={isFavorited ? "red" : "white"}
        />
      </div>
      <CatImage url={imageUrl} alt={"Cat image"} />
    </div>
  );
}
