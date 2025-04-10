import { useInfiniteQuery } from "@tanstack/react-query";
import { getFavourites } from "../api";
import Loader from "../components/Loader";
import DisplayError from "../components/DisplayError";
import FavouriteCard from "../components/FavouriteCard";
import Button from "../components/Button";
import Grid from "../components/Grid";

const LIMIT = 10;

export default function Favourites() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["favourites"],
    queryFn: ({ signal, pageParam = 1 }) =>
      getFavourites(pageParam, LIMIT, signal),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < LIMIT ? undefined : allPages.length + 1,
    initialPageParam: 1,
  });

  const favourites = data?.pages?.flat() || [];

  if (isLoading) {
    return <Loader className="mt-16" size="lg" />;
  }

  if (!favourites) {
    return <DisplayError errorMessage="No favourites found" />;
  }

  if (isError) {
    return <DisplayError errorMessage="Failed to fetch favourite images" />;
  }

  return (
    <main>
      <Grid>
        {favourites.map((fav) => {
          return (
            <FavouriteCard
              key={fav.id}
              id={fav.id}
              imageId={fav.image_id}
              imageUrl={fav.image.url}
            />
          );
        })}
      </Grid>
      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <Button onClick={() => fetchNextPage()} loading={isFetchingNextPage}>
            Load More
          </Button>
        </div>
      )}
    </main>
  );
}
