import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchCatPhoto, getFavourites } from "../api";
import Loader from "../components/Loader";
import DisplayError from "../components/DisplayError";
import FavouriteCard from "../components/FavouriteCard";

export default function Favourites() {
  const { data: favourites } = useQuery({
    queryKey: ["favourites"],
    queryFn: () => getFavourites(),
  });

  const catImageQueries = useQueries({
    queries: Array.isArray(favourites) // ensure this will return an array even if favourites is undefined
      ? favourites.map((fav) => ({
          queryKey: ["catImage", fav.image_id],
          queryFn: () => fetchCatPhoto(fav.image_id),
          enabled: !!fav.image_id,
        }))
      : [],
  });

  const isLoadingAny = catImageQueries.some((query) => query.isLoading);
  const hasError = catImageQueries.some((query) => query.error);

  if (isLoadingAny) {
    return <Loader className="mt-16" size="lg" />;
  }

  if (!catImageQueries) {
    return <>No images found</>;
  }

  if (hasError) {
    return <DisplayError errorMessage="Failed to fetch favourite images" />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {catImageQueries.map((query, index) => {
        const catImage = query.data;
        return (
          <FavouriteCard
            id={favourites[index].id}
            imageId={catImage.id}
            imageUrl={catImage.url}
          />
        );
      })}
    </div>
  );
}
