import { useQuery } from "@tanstack/react-query";
import { fetchBreed } from "../api";
import { useState } from "react";
import { CatInfo } from "../types";
import Loader from "./Loader";
import DisplayError from "./DisplayError";
import { pushURLParams } from "../utils/helpers";
import CatImage from "./CatImage";
import Grid from "./Grid";
import FlipModal from "./FlipModal";
import BreedCardFront from "./BreedCardFront";
import BreedCardBack from "./BreedCardBack";

type Props = {
  breedId: string;
};

const LIMIT = 20;

export default function BreedImages({ breedId }: Props) {
  const [selectedCat, setSelectedCat] = useState<CatInfo | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const {
    data: catBreedImages,
    isPending,
    error: catBreedImagesError,
  } = useQuery({
    queryKey: ["breedImages", breedId],
    queryFn: ({ signal }) => fetchBreed(breedId as string, LIMIT, signal),
    enabled: !!breedId,
  });

  if (catBreedImagesError)
    return <DisplayError errorMessage="Something went wrong!" />;
  if (isPending)
    return (
      <Loader
        className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        size="lg"
      />
    );
  if (!catBreedImages || catBreedImages.length === 0)
    return <DisplayError errorMessage="No images found!" />;

  return (
    <Grid className="px-6 py-10">
      {catBreedImages.map((cat: CatInfo) => {
        return (
          <>
            <div
              key={cat.id}
              onClick={() => {
                setIsDetailsModalOpen(true);
                setSelectedCat(cat);
                pushURLParams({ id: cat.id as string });
              }}
            >
              <CatImage url={cat.url} alt="image of a cat" />
            </div>
          </>
        );
      })}

      {isDetailsModalOpen && (
        <FlipModal
          isOpen={isDetailsModalOpen}
          flipDisabled={!selectedCat?.breeds || selectedCat.breeds.length === 0}
          front={
            <BreedCardFront
              url={selectedCat?.url as string}
              id={selectedCat?.id as string}
              setIsOpen={setIsDetailsModalOpen} //find better way to close the modal
            />
          }
          back={
            <BreedCardBack
              breeds={selectedCat?.breeds ?? []}
              setIsOpen={setIsDetailsModalOpen}
            />
          }
        />
      )}
    </Grid>
  );
}
