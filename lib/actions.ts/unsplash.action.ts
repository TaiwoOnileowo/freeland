"use server";

import { Photo } from "@/types";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import unsplashlogo from "@/public/icons/unsplash.svg";
const unsplashApiKey = process.env.FREELAND_UNSPLASH_ACCESS_KEY;
if (!unsplashApiKey) {
  throw new Error("Unsplash API key is missing");
}

export const getUnsplashPhotos = async ({
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
  console.log(query, "unsplashquery");
  const unsplashUrl = query
    ? `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}orderBy=relevant`
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
    const data:
      | (Basic & {
          slug: string;
        })[]
      | {
          results: (Basic & {
            slug: string;
          })[];
        } = await response.json();
    console.log(response, "unsplashresponse");
    const mappedData = query && "results" in data ? data.results : data;

    const photos: Photo[] = (mappedData as (Basic & { slug: string })[]).map(
      (photo) => ({
        id: photo.id,
        width: photo.width,
        height: photo.height,
        blur_hash: photo.blur_hash ?? "",
        alt: photo.alt_description ?? photo.slug,
        url: photo.urls.small,
        freeland_url: `/images/${photo.slug}`,
        author: photo.user.name,
        author_url: photo.user.links.html,
        likes: 0,
        provider: "Unsplash",
        provider_logo: unsplashlogo,
        provider_url: "https://unsplash.com/",
      })
    );
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
