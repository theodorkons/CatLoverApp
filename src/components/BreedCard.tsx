import { useEffect, useState } from "react";
import { createFavourite, deleteFavourite, getFavourites } from "../api";
import { CatInfo, Favourites } from "../types";
import HeartIcon from "./HeartIcon";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

export default function BreedCard({ url, id, breeds }: CatInfo) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favouriteId, setFavouriteId] = useState<null | string>(null);
  const { isPending, error, data } = useQuery({
    queryKey: ["favourites"],
    queryFn: () => getFavourites(),
  });

  useEffect(() => {
    if (data) {
      const fav = data.find((fav: Favourites) => fav.image_id === id);
      if (fav) {
        setIsFavorited(fav.id);
        setFavouriteId(fav.id);
      } else {
        setIsFavorited(false);
        setFavouriteId(null);
      }
    }
  }, [data]);

  const handleHeartClick = () => {
    if (isFavorited && favouriteId) {
      deleteFavourite(favouriteId);
      setIsFavorited(false);
    } else {
      createFavourite(id);
      setIsFavorited(true);
    }
  };

  console.log("fav", data);
  return (
    <>
      <div
        onClick={() => handleHeartClick()}
        className="absolute top-1 right-1 w-6 h-6"
      >
        <HeartIcon
          fill={isFavorited ? "red" : "white"}
          stroke={isFavorited ? "red" : "white"}
        />
      </div>
      <img
        src={url}
        alt="image of a cat"
        className="h-[20rem] w-full object-top"
      />
      {breeds && (
        <div>
          {breeds.map((breed, index) => (
            <div key={index}>
              <Link to="/breeds">Name: {breed.name}</Link>
              <p>Weight: {breed.weight.metric}kg</p>
              <p>Lifespan: {breed.lifespan} years</p>
              <p>Temperament: {breed.temperament}</p>
              <p>Description: {breed.description}</p>
              <p>
                Wikipedia:{" "}
                <a
                  href={breed.wikipedia_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {breed.wikipedia_url}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
