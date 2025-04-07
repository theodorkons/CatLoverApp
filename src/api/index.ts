const user = "catlover2025";

export async function fetchCatPhotos(limit: number) {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_API_URL
      }/images/search?limit=${limit}&api_key=${import.meta.env.VITE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cat images`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchCatPhoto(id: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/images/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cat image`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function createFavourite(imageId: string) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({
        image_id: imageId,
        sub_id: user,
      }),
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

export async function getFavourites() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/favourites?sub_id=${user}&api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch favourites`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteFavourite(id: string) {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({
        //   image_id: imageId,
        sub_id: user,
      }),
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

export async function fetchAllBreeds() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/breeds?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch breeds`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchBreed(breedId: string) {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_API_URL
      }/images/search?breed_ids=${breedId}&limit=100&api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch breed images`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
