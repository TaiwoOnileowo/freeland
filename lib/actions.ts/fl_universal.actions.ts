"use server";
import { Photo } from "@/types";

import { getFreepikPhotos } from "./freepik.actions";
import { getUnsplashPhotos } from "./unsplash.action";
import { getPixabayPhotos } from "./pixabay.actions";
import { getPexelsPhotos } from "./pexels.actions";
import { formatImageData } from "../utils";

import { redisClient, connectToRedis } from "../redis";
export const fetchPhotosFromApi = async ({
  page,
  perPage,

  query,
  filters,
}: {
  page: number;
  perPage: number;
  query: string;
  filters?: { order: string };
}) => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const freePikData = await getFreepikPhotos({
      page,
      perPage,
      signal,
      query,
      filters,
    });
    const pexelsData = await getPexelsPhotos({ page, perPage, signal, query });
    const unsplashData = await getUnsplashPhotos({
      page,
      perPage,
      signal,
      query,
      filters,
    });
    const pixabayData = await getPixabayPhotos({
      page,
      perPage,
      signal,
      query,
      filters,
    });
    if (!signal.aborted) {
      const combinedData = [
        ...freePikData,
        ...pexelsData,
        ...unsplashData,
        ...pixabayData,
      ];
      const formattedData = formatImageData(combinedData);

      return formattedData;
    }
  } catch (error) {
    if (!signal.aborted) {
      console.error("Error fetching photos:", error);
    }
  }

  controller.abort();
  return [];
};

export const getPhotos = async ({
  page,
  perPage,
  query,
  filters,
}: {
  page: number;
  perPage: number;
  query: string;
  filters?: { order: string };
}) => {
  connectToRedis();
  const order = filters?.order || "relevance";
  const cacheKey = `photos:${query === "" ? "all" : query}:${page}:filters:${order}`;

  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    console.log("Serving from Redis cache");
    return JSON.parse(cachedData);
  }

  console.log("Fetching new data from API");
  const data: Photo[][] = await fetchPhotosFromApi({
    page,
    perPage,
    query,
    filters,
  });

  await redisClient.set(cacheKey, JSON.stringify(data), { EX: 10800 });

  return data;
};
