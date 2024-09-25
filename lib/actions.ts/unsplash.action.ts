"use server";

import { Photo } from "@/types";

import unsplashlogo from "@/public/icons/unsplash.svg";
const unsplashApiKey = process.env.FREELAND_UNSPLASH_ACCESS_KEY;
if (!unsplashApiKey) {
  throw new Error("Unsplash API key is missing");
}
interface UnsplashPhoto {
  id: string;
  width: number;
  height: number;
  blur_hash?: string;
  alt_description?: string;
  slug: string;
  urls: {
    small: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}
export const getUnsplashPhotos = async ({
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
  let order = filters?.order || "relevant";
  if (filters?.order === "relevance") {
    order = "relevant";
  }

  const unsplashUrl = query
    ? `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}&order_by=${order}`
    : `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}&order_by=${order}`;
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
    const data = await response.json();

    const mappedData = query && "results" in data ? data.results : data;

    const photos: Photo[] = mappedData.map((photo: UnsplashPhoto) => ({
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
      provider: "unsplash",
      provider_logo: unsplashlogo,
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
