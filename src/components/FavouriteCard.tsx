import { useState } from "react";
import { createFavourite, deleteFavourite } from "../api";
import HeartIcon from "./HeartIcon";

interface Props {
  id: string;
  imageId: string;
  imageUrl: string;
}

export default function FavouriteCard({ id, imageId, imageUrl }: Props) {
  const [isFavorited, setIsFavorited] = useState(true);
  console.log("id", id, imageId);
  //resuse this in breedcard
  const handleHeartClick = () => {
    if (isFavorited) {
      deleteFavourite(id);
      setIsFavorited(false);
    } else {
      createFavourite(imageId);
      setIsFavorited(true);
    }
  };
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
      <img src={imageUrl} alt={`Cat image`} className="rounded-lg shadow-md" />
    </div>
  );
}
