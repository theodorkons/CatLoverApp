import { useQuery } from "@tanstack/react-query";
import { fetchBreed } from "../api";
import { useSearchParams } from "react-router";
import Modal from "./Modal";
import BreedCard from "./BreedCard";
import { useState } from "react";
import { CatInfo } from "../types";
import Loader from "./Loader";
import DisplayError from "./DisplayError";
import { pushURLParams, removeURLParams } from "../utils/helpers";

type Props = {
  breedId: string;
};

export default function BreedImages({ breedId }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCat, setSelectedCat] = useState<CatInfo | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  //   const id = "bamb";
  //   const id = searchParams.get("id");

  const {
    data: catBreedImages,
    isPending,
    error: catBreedImagesError,
  } = useQuery({
    queryKey: ["breedImages", breedId],
    queryFn: () => fetchBreed(breedId as string),
    enabled: !!breedId,
  });

  if (catBreedImagesError)
    return <DisplayError errorMessage="Something went wrong!" />;
  if (!isPending)
    return (
      <div className="grid grid-cols-4 gap-3">
        {catBreedImages.map((cat: CatInfo) => {
          return (
            <>
              <img
                key={cat.id}
                src={cat.url}
                alt="image of a cat"
                className={`w-full h-[20rem] cursor-pointer`}
                onClick={() => {
                  setIsDetailsModalOpen(true);
                  setSelectedCat(cat);
                  pushURLParams({ id: cat.id as string });
                }}
              />
            </>
          );
        })}

        {selectedCat && (
          <Modal
            isOpen={isDetailsModalOpen}
            setIsOpen={setIsDetailsModalOpen}
            onClose={() => removeURLParams(["id"])}
          >
            <BreedCard {...selectedCat} />
          </Modal>
        )}
      </div>
    );
  return (
    <Loader
      className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      size="lg"
    />
  );
}
