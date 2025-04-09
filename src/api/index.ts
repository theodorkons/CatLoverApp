const user = "catlover2025";

export async function fetchCatPhotos(limit: number, signal?: AbortSignal) {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_API_URL
      }/images/search?limit=${limit}&api_key=${import.meta.env.VITE_API_KEY}`,
      { signal }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cat images`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchCatPhoto(id: string, signal?: AbortSignal) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/images/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }`,
      { signal }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cat image`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function createFavourite(imageId: string, signal?: AbortSignal) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({
        image_id: imageId.toString(),
        sub_id: user,
      }),
      signal,
    };

    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/favourites`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Failed to save as favourite`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getFavourites(
  page?: number,
  limit?: number,
  signal?: AbortSignal
) {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_API_URL
      }/favourites?sub_id=${user}&limit=${limit}&page=${page}&api_key=${
        import.meta.env.VITE_API_KEY
      }`,
      { signal }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch favourites`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getFavourite(imageId: string, signal?: AbortSignal) {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_API_URL
      }/favourites?sub_id=${user}&image_id=${imageId}&api_key=${
        import.meta.env.VITE_API_KEY
      }`,
      { signal }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch favourite`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteFavourite(id: number, signal?: AbortSignal) {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({
        sub_id: user,
      }),
      signal,
    };
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/favourites/${id}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Failed to delete favourite`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchAllBreeds(signal?: AbortSignal) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/breeds?api_key=${
        import.meta.env.VITE_API_KEY
      }`,
      { signal }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch breeds`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchBreed(
  breedId: string,
  limit?: number,
  signal?: AbortSignal
) {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_API_URL
      }/images/search?breed_ids=${breedId}&limit=${limit}&api_key=${
        import.meta.env.VITE_API_KEY
      }`,
      { signal }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch breed images`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
