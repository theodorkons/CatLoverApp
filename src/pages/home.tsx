import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCatPhoto, fetchCatPhotos } from "../api";
import { useEffect, useState } from "react";
import { CatInfo } from "../types";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { pushURLParams } from "../utils/helpers";
import { useSearchParams } from "react-router";
import PopupError from "../components/PopupError";
import DisplayError from "../components/DisplayError";
import useErrorPopup from "../hooks/useErrorPopup";
import CatImage from "../components/CatImage";
import Grid from "../components/Grid";
import FlipModal from "../components/FlipModal";
import BreedCardBack from "../components/BreedCardBack";
import BreedCardFront from "../components/BreedCardFront";

const LIMIT = 10;

function Home() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<CatInfo | null>(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const queryClient = useQueryClient();

  const {
    isPending,
    error: catImagesError,
    data: catImages,
  } = useQuery({
    queryKey: ["images"],
    queryFn: ({ signal }) => fetchCatPhotos(LIMIT, signal),
    refetchOnWindowFocus: false,
  });

  const { data: catPhotoData, error: catPhotoError } = useQuery({
    queryKey: ["fetchCatPhoto", id],
    queryFn: ({ signal }) => fetchCatPhoto(id as string, signal),
    enabled: !!id,
  });

  const { showError, errorMessage, triggerError } = useErrorPopup({
    error: catPhotoError,
    message: "Failed to load cat details",
  });

  useEffect(() => {
    if (catPhotoData) {
      setSelectedCat(catPhotoData);
      setIsDetailsModalOpen(true);
    }
  }, [catPhotoData]);

  const fetchMoreCats = async () => {
    setButtonLoading(true);
    try {
      const newPhotos = await fetchCatPhotos(LIMIT);
      // Update the existing "images" cache by appending the newly fetched photos to the old ones
      queryClient.setQueryData<CatInfo[]>(["images"], (prev) => [
        ...(prev ?? []),
        ...newPhotos,
      ]);
    } catch (error) {
      triggerError("Could not load more photos");
    }
    setButtonLoading(false);
  };

  if (catImagesError)
    return <DisplayError errorMessage="Something went wrong!" />;
  if (isPending) return <Loader className="mt-16" size="lg" />;
  if (!catImages || catImages?.length === 0)
    return <DisplayError errorMessage="No images found!" />;

  return (
    <main className="flex flex-col justify-center mb-7">
      <Grid>
        {catImages.map((entry: CatInfo) => {
          return (
            <div
              key={entry.id}
              onClick={() => {
                setIsDetailsModalOpen(true);
                setSelectedCat(entry);
                pushURLParams({ id: entry.id as string });
              }}
            >
              <CatImage key={entry.id} url={entry.url} alt="image of a cat" />
            </div>
          );
        })}

        {isDetailsModalOpen && (
          <FlipModal
            isOpen={isDetailsModalOpen}
            setIsOpen={setIsDetailsModalOpen}
            flipDisabled={
              !selectedCat?.breeds || selectedCat.breeds.length === 0
            }
            front={
              <BreedCardFront
                url={selectedCat?.url as string}
                id={selectedCat?.id as string}
              />
            }
            back={<BreedCardBack breeds={selectedCat?.breeds ?? []} />}
          />
        )}
      </Grid>

      <Button
        loading={buttonLoading}
        onClick={fetchMoreCats}
        className="mx-auto mt-4 px-6"
      >
        Load More
      </Button>

      {showError && errorMessage && <PopupError error={errorMessage} />}
    </main>
  );
}

export default Home;
