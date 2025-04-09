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
    <div key={id} className="relative">
      <div
        onClick={() => handleHeartClick()}
        className="absolute top-1 right-1 w-6 h-6"
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
