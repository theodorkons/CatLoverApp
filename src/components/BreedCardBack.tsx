import { CatBreed } from "../types";
import { Link } from "react-router";
import ExitIcon from "./icons/ExitIcon";

interface Props {
  breeds: CatBreed[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BreedCardBack({ breeds, setIsOpen }: Props) {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-6 pt-16">
      <div
        className="cursor-pointer absolute left-6 top-3.5 z-50"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <ExitIcon fill={"black"} />
      </div>
      {breeds?.map((breed, index) => (
        <div key={index} className="[&>*]:py-2 [&>*]:font-semibold">
          <Link
            to={`/breeds?breedId=${breed.id}`}
            className="text-4xl mb-4 font-bold block text-gray-900 underline"
          >
            {breed.name}
          </Link>
          <p>
            <span>Weight:</span> {breed.weight.metric}
            kg
          </p>
          <p>
            <span>Lifespan:</span> {breed.lifespan} years
          </p>
          <p>
            <span>Temperament:</span> {breed.temperament}
          </p>
          <p>
            <span>Description:</span> {breed.description}
          </p>
          <p>
            <span>Wikipedia:</span>{" "}
            <a
              href={breed.wikipedia_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black-600 underline break-words"
            >
              {breed.wikipedia_url}
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}
