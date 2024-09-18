"use server";

import { Photo } from "@/types";
import { Photos } from "pexels";
const pexelsApiKey = process.env.FREELAND_PEXELS_API_KEY;
if (!pexelsApiKey) {
  throw new Error("Pexels API key is missing");
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
    const data: Photos = await response.json();

    const photo: Photo[] = data.photos.map((photo) => {
      const slug = photo.url.split("https://www.pexels.com/photo/").pop();

      return {
        id: photo.id.toString(),
        width: photo.width,
        height: photo.height,
        url: photo.src.original,
        blur_hash: "",
        alt: photo.alt,
        freeland_url: `/images/${slug}`,
        author: photo.photographer,
        author_url: photo.photographer_url,
        likes: 0,
        provider: "Pexels",
        provider_logo: "https://www.pexels.com/favicon.ico",
        provider_url: "https://www.pexels.com/",
      };
    });
    return photo;
  } catch (error) {
    console.error("Error fetching photos", error);
    throw new Error("Failed to fetch photos");
  }
};

