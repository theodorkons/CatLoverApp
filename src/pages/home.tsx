import { useQuery } from "@tanstack/react-query";
import { fetchCatPhoto, fetchCatPhotos } from "../api";
import { useEffect, useState } from "react";
import { CatInfo } from "../types";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import BreedCard from "../components/BreedCard";
import { pushURLParams, removeURLParams } from "../utils/helpers";
import { useSearchParams } from "react-router";
import PopupError from "../components/PopupError";
import DisplayError from "../components/DisplayError";

function Home() {
  const [catImages, setCatImages] = useState<CatInfo[] | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const numberOfPhotos = 10;
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isBreedModalOpen, setIsBreedModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<CatInfo | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const id = searchParams.get("id");

  const {
    isPending,
    error: catImagesError,
    data,
  } = useQuery({
    queryKey: ["images"],
    queryFn: () => fetchCatPhotos(numberOfPhotos),
  });

  const { data: catPhotoData, error: catPhotoError } = useQuery({
    queryKey: ["catPhoto", id],
    queryFn: () => fetchCatPhoto(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (catPhotoData) {
      console.log("catdata", catPhotoData);
      setSelectedCat(catPhotoData);
      setIsDetailsModalOpen(true);
    }
  }, [catPhotoData]);

  useEffect(() => {
    if (data) {
      setCatImages(data);
    }
  }, [data]);

  const fetchMoreCats = async () => {
    setButtonLoading(true);
    // show pop error if fetch fails
    try {
      const newPhotos = await fetchCatPhotos(numberOfPhotos);
      setCatImages((prevImages) =>
        prevImages ? [...prevImages, ...newPhotos] : [...newPhotos]
      );
    } catch (error) {
      setError("Could not load more photos");
    }
    setButtonLoading(false);
  };

  console.log(data);
  if (catImagesError)
    return <DisplayError errorMessage="Something went wrong!" />;
  if (!isPending && catImages)
    return (
      <div>
        <div className="grid-cols-5 grid gap-3">
          {catImages.map((entry: CatInfo) => {
            return (
              <img
                key={entry.id}
                src={entry.url}
                alt="image of a cat"
                className={`w-full h-[20rem] cursor-pointer`}
                onClick={() => {
                  setIsDetailsModalOpen(true);
                  setSelectedCat(entry);
                  pushURLParams({ id: entry.id as string });
                }}
              />
            );
          })}
        </div>

        {selectedCat && (
          <Modal
            isOpen={isDetailsModalOpen}
            setIsOpen={setIsDetailsModalOpen}
            onClose={() => removeURLParams()}
          >
            <BreedCard {...selectedCat} />
          </Modal>
        )}

        {/* <Modal isOpen={isBreedModalOpen} setIsOpen={setIsBreedModalOpen}>
          <div></div>
        </Modal> */}

        <Button loading={buttonLoading} onClick={fetchMoreCats}>
          Load More
        </Button>

        {error && <PopupError error={error} />}
      </div>
    );
  return <Loader className="mt-16" size="lg" />;
}

export default Home;
