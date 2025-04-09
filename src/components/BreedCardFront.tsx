import HeartIcon from "./icons/HeartIcon";
import { useFavourite } from "../hooks/useFavourites";
import PopupError from "./PopupError";
import CatImage from "./CatImage";
import ExitIcon from "./icons/ExitIcon";
import { imagePlaceHolder } from "../utils/constants";

interface Props {
  url: string;
  id: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BreedCardFront({
  url = imagePlaceHolder,
  id,
  setIsOpen,
}: Props) {
  const { isFavorited, handleHeartClick, showError, errorMessage } =
    useFavourite(id as string);

  return (
    <>
      <div className="absolute cursor-pointer top-0 left-0 w-full h-16 bg-gradient-to-b from-black/60 to-transparent z-10" />
      <div
        className="cursor-pointer absolute left-6 top-3.5 z-50"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <ExitIcon fill={"white"} />
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation(); // prevent flipping when clicking heart
          handleHeartClick();
        }}
        className="absolute top-4 right-6 w-6 h-6 cursor-pointer z-20"
      >
        <HeartIcon
          fill={isFavorited ? "red" : "white"}
          stroke={isFavorited ? "red" : "white"}
        />
      </div>
      <CatImage url={url} alt="image of cat" className="h-full" />

      {showError && errorMessage && <PopupError error={errorMessage} />}
    </>
  );
}
