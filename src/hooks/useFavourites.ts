import { useState, useEffect } from "react";
import { createFavourite, deleteFavourite, getFavourite } from "../api";
import { useQuery } from "@tanstack/react-query";
import useErrorPopup from "./useErrorPopup";

export function useFavourite(imageId: string, id?: number) {
  const [isFavorited, setIsFavorited] = useState(!!id);
  const [favouriteId, setFavouriteId] = useState<null | number>(id ?? null);
  const [loading, setLoading] = useState(false);

  const { showError, errorMessage, triggerError } = useErrorPopup({
    duration: 5000,
  });

  const { data } = useQuery({
    queryKey: ["getFavourite", imageId],
    queryFn: ({ signal }) => getFavourite(imageId, signal),
    enabled: !id, // run ONLY if id is not provided
  });

  // If query ran, use the result to set state
  useEffect(() => {
    if (!id && data) {
      const favourite = data[0] ?? null;
      if (favourite) {
        setIsFavorited(true);
        setFavouriteId(favourite.id);
      } else {
        setIsFavorited(false);
        setFavouriteId(null);
      }
    }
  }, [data, id]);

  const handleHeartClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isFavorited && favouriteId) {
        await deleteFavourite(favouriteId);
        setIsFavorited(false);
        setFavouriteId(null);
      } else {
        const res = await createFavourite(imageId);
        setIsFavorited(true);
        setFavouriteId(res.id);
      }
    } catch (err) {
      triggerError("Failed to update favourites");
    } finally {
      setLoading(false);
    }
  };

  return { isFavorited, handleHeartClick, showError, errorMessage };
}
