import HeartIcon from "./icons/HeartIcon";
import { useFavourite } from "../hooks/useFavourites";
import PopupError from "./PopupError";
import CatImage from "./CatImage";
import { imagePlaceHolder } from "../utils/constants";

interface Props {
  url: string;
  id: string;
}

export default function BreedCardFront({ url = imagePlaceHolder, id }: Props) {
  const { isFavorited, handleHeartClick, showError, errorMessage } =
    useFavourite(id as string);

  return (
    <>
      <div className="absolute cursor-pointer top-0 left-0 w-full h-16 bg-gradient-to-b from-black/60 to-transparent z-10" />
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleHeartClick();
        }}
        className="absolute top-4 left-6 w-6 h-6 cursor-pointer z-20 hover:scale-120"
      >
        <HeartIcon
          fill={isFavorited ? "red" : "white"}
          stroke={isFavorited ? "red" : "white"}
        />
      </div>
      <CatImage
        url={url}
        alt="image of cat"
        className="h-full hover:scale-100"
      />

      {showError && errorMessage && <PopupError error={errorMessage} />}
    </>
  );
}
