export type CatBreed = {
  name: string;
  id: string;
  weight: { imperial: string; metric: string };
  lifespan: string;
  temperament: string;
  description: string;
  wikipedia_url: string;
};

export type CatImage = {
  id?: string;
  url?: string;
  width?: number;
  height?: number;
};

export type CatInfo = CatImage & {
  breeds: CatBreed[];
};

export type Favourites = {
  id: string;
  image_id: string;
};

export type CatBreedWithImage = CatBreed & {
  image?: CatImage;
};
