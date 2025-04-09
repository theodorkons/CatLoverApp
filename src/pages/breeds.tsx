import { useQuery } from "@tanstack/react-query";
import { fetchAllBreeds } from "../api";
import Breed from "../components/Breed";
import Loader from "../components/Loader";
import { CatBreedWithImage } from "../types";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import BreedImages from "../components/BreedImages";
import { useSearchParams } from "react-router";
import DisplayError from "../components/DisplayError";
import { pushURLParams, removeURLParams } from "../utils/helpers";
import Grid from "../components/Grid";

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
    queryFn: ({ signal }) => fetchAllBreeds(signal),
  });

  if (catBreedsError)
    return <DisplayError errorMessage="Something went wrong" />;
  if (isPending) return <Loader className="mt-16" size="lg" />;
  if (!catBreeds || catBreeds.length === 0)
    return <DisplayError errorMessage="No cat breeds found!" />;

  return (
    <main>
      <Grid>
        {catBreeds &&
          catBreeds.map((breed: CatBreedWithImage) => {
            return (
              <div
                key={breed.id}
                onClick={() => {
                  setBreedId(breed.id);
                  setIsBreedImagesOpen(true);
                  pushURLParams({ breedId: breed.id });
                }}
              >
                <Breed url={breed?.image?.url ?? ""} name={breed.name} />
              </div>
            );
          })}
      </Grid>

      {breedId && (
        <Modal
          isOpen={isBreedImagesOpen}
          setIsOpen={setIsBreedImagesOpen}
          onClose={() => removeURLParams()}
          exitIconColor="black"
          className="w-full h-full pt-6"
        >
          <BreedImages breedId={breedId} />
        </Modal>
      )}
    </main>
  );
}
