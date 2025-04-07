import { useQuery } from "@tanstack/react-query";
import { fetchAllBreeds } from "../api";
import Breed from "../components/Breed";
import Loader from "../components/Loader";
import { CatBreed, CatBreedWithImage } from "../types";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import BreedImages from "../components/BreedImages";
import { useSearchParams } from "react-router";
import DisplayError from "../components/DisplayError";
import { pushURLParams, removeURLParams } from "../utils/helpers";

export default function Breeds() {
  const [isBreedImagesOpen, setIsBreedImagesOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [breedId, setBreedId] = useState(searchParams.get("breedId"));

  useEffect(() => {
    if (breedId) setIsBreedImagesOpen(true);
  }, []);

  const {
    data: catBreeds,
    isPending,
    error: catBreedsError,
  } = useQuery({
    queryKey: ["breeds"],
    queryFn: () => fetchAllBreeds(),
  });

  if (catBreedsError)
    return <DisplayError errorMessage="Something went wrong" />;
  if (!isPending && catBreeds)
    return (
      <div className="grid grid-cols-4 gap-3">
        {catBreeds &&
          catBreeds.map((breed: CatBreedWithImage) => {
            const breeds: CatBreed[] = [
              {
                name: breed.name,
                id: breed.id,
                weight: breed.weight,
                lifespan: breed.lifespan,
                temperament: breed.temperament,
                description: breed.description,
                wikipedia_url: breed.wikipedia_url,
              },
            ];
            const image = {
              id: breed.image?.id,
              url: breed.image?.url,
              width: breed.image?.width,
              height: breed.image?.height,
            };
            return (
              <div
                key={breed.id}
                onClick={() => {
                  setBreedId(breed.id);
                  setIsBreedImagesOpen(true);
                  pushURLParams({ breedId: breed.id });
                }}
              >
                <Breed breeds={breeds} {...image} />
              </div>
            );
          })}

        {breedId && (
          <Modal
            isOpen={isBreedImagesOpen}
            setIsOpen={setIsBreedImagesOpen}
            onClose={() => removeURLParams()}
            className="w-full h-full"
          >
            <BreedImages breedId={breedId} />
          </Modal>
        )}
      </div>
    );
  return <Loader className="mt-16" size="lg" />;
}
