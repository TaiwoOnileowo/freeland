"use server";

import { Photo } from "@/types";

import pexelslogo from "@/public/icons/pexels.svg";
const pexelsApiKey = process.env.FREELAND_PEXELS_API_KEY;
if (!pexelsApiKey) {
  throw new Error("Pexels API key is missing");
}
interface PexelPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
  };
  alt?: string;
}
export const getPexelsPhotos = async ({
  page,
  perPage,
  signal,
  query,
}: {
  page: number;
  perPage: number;
  signal?: AbortSignal;
  query?: string;
}) => {
  const pexelsUrl = query
    ? `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`
    : `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${page}`;
  try {
    const response = await fetch(pexelsUrl, {
      headers: {
        Authorization: pexelsApiKey,
      },
      signal,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Pexels photos");
    }
    const data = await response.json();

    const photo: Photo[] = data.photos.map((photo: PexelPhoto) => {
      const slug =
        photo.url.split("https://www.pexels.com/photo/").pop() ??
        `photo by ${photo.photographer}`;

      return {
        id: photo.id.toString(),
        width: photo.width,
        height: photo.height,
        url: photo.src.original,
        blur_hash: "",
        alt: photo.alt ?? slug,
        freeland_url: `/images/${slug}`,
        author: photo.photographer,
        author_url: photo.photographer_url,
        likes: 0,
        provider: "Pexels",
        provider_logo: pexelslogo,
        provider_url: "https://www.pexels.com/",
      };
    });
    return photo;
  } catch (error) {
    console.error("Error fetching photos", error);
    throw new Error("Failed to fetch photos");
  }
};
