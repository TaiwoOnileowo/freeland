"use server";

import { Photo } from "@/types";
import { Photos } from "pexels";
const pexelsApiKey = process.env.FREELAND_PEXELS_API_KEY;
if (!pexelsApiKey) {
  throw new Error("Pexels API key is missing");
}

export const getPexelsPhotosPerPage = async (
  page = 1,
  perPage = 30,
  signal: AbortSignal
) => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: pexelsApiKey,
        },
        signal,
      }
    );
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
