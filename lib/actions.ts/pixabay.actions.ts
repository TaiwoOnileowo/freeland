"use server";

import { Photo } from "@/types";
import pixabaylogo from "@/public/icons/pixabay.svg";
const pixabayApiKey = process.env.FREELAND_PIXABAY_API_KEY;
if (!pixabayApiKey) {
  throw new Error("Pixabay API key is missing");
}
interface PixabayPhoto {
  id: string;
  imageWidth: number;
  imageHeight: number;
  webformatURL: string;
  pageURL: string;
  user: string;
  userImageURL: string;
}
export const getPixabayPhotos = async ({
  page,
  perPage,
  signal,
  query,
  filters,
}: {
  page: number;
  perPage: number;
  signal?: AbortSignal;
  query?: string;
  filters?: {
    order: string;
  };
}) => {
  const order = filters?.order || "popular";

  const pixabayUrl = query
    ? `https://pixabay.com/api/?key=${pixabayApiKey}&q=${query}&image_type=photo&pretty=true&per_page=${perPage}&page=${page}&order=${order}`
    : `https://pixabay.com/api/?key=${pixabayApiKey}&image_type=photo&pretty=true&per_page=${perPage}&page=${page}&order=${order}`;
  try {
    const response = await fetch(pixabayUrl, {
      signal,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch Pexels photos");
    }
    const data = await response.json();
    console.log(data.hits[0]);
    const photo: Photo[] = data.hits.map((photo: PixabayPhoto): Photo => {
      const slug =
        photo.pageURL.split("https://pixabay.com/photos/").pop() || "";

      return {
        id: photo.id.toString(),
        width: photo.imageWidth,
        height: photo.imageHeight,
        url: photo.webformatURL,
        blur_hash: "",
        alt: slug,
        freeland_url: `/images/${slug}`,
        author: photo.user,
        author_url: photo.userImageURL,
        likes: 0,
        provider: "pixaBay",
        provider_logo: pixabaylogo,
        provider_url: "https://pixabay.com/",
      };
    });
    return photo;
  } catch (error) {
    console.error("Error fetching photos", error);
    throw new Error("Failed to fetch photos");
  }
};
