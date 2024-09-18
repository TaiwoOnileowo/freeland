"use server";

import { Photo } from "@/types";
import { Basic } from "unsplash-js/dist/methods/photos/types";

const unsplashApiKey = process.env.FREELAND_UNSPLASH_ACCESS_KEY;
if (!unsplashApiKey) {
  throw new Error("Unsplash API key is missing");
}

export const getUnsplashPhotos = async ({
  page,
  perPage,
  signal,
  searchTerm,
}: {
  page: number;
  perPage: number;
  signal?: AbortSignal;
  searchTerm?: string;
}) => {
  const unsplashUrl = searchTerm
    ? `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}&per_page=${perPage}`
    : `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}`;
  try {
    const response = await fetch(unsplashUrl, {
      headers: {
        Authorization: `Client-ID ${unsplashApiKey}`,
      },
      signal,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch Unsplash photos");
    }
    const data: (Basic & {
      slug: string;
    })[] = await response.json();
    const mappedData = searchTerm ? data.results : data;
    const photos: Photo[] = mappedData.map((photo) => ({
      id: photo.id,
      width: photo.width,
      height: photo.height,
      blur_hash: photo.blur_hash,
      alt: photo.alt_description,
      url: photo.urls.small,
      freeland_url: `/images/${photo.slug}`,
      author: photo.user.name,
      author_url: photo.user.links.html,
      likes: 0,
      provider: "Unsplash",
      provider_logo: "https://unsplash.com/favicon.ico",
      provider_url: "https://unsplash.com/",
    }));
    return photos;
  } catch (error) {
    console.error("Error fetching photos", error);
    throw new Error("Failed to fetch photos");
  }
};

export const getUnsplashDownloadUrl = async (photoId: string) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/${photoId}/download`,
      {
        headers: {
          Authorization: `Client-ID ${unsplashApiKey}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to download Unsplash  photo");
    }
    const data = await response.json();

    return data.url;
  } catch (error) {
    console.error("Error downloading Unsplash photo", error);
    throw new Error("Failed to download Unsplash photo");
  }
};
