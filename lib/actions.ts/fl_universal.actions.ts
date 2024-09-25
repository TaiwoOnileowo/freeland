"use server";
import { Photo } from "@/types";

import { getFreepikPhotos } from "./freepik.actions";
import { getUnsplashPhotos } from "./unsplash.action";
import { getPixabayPhotos } from "./pixabay.actions";
import { getPexelsPhotos } from "./pexels.actions";
import { formatImageData } from "../utils";

import { redisClient, connectToRedis, disconnectFromRedis } from "../redis";
export const fetchPhotosFromApi = async ({
  page,
  perPage,

  query,
  filters,
}: {
  page: number;
  perPage: number;
  query: string;
  filters?: { order: string; provider: string };
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
      let data: Photo[] = [];
      const providers = filters?.provider.split(",");
      providers?.forEach((provider) => {
        if (provider === "freepik") {
          data = data.concat(freePikData);
        }
        if (provider === "pexels") {
          data = data.concat(pexelsData);
        }
        if (provider === "unsplash") {
          data = data.concat(unsplashData);
        }
        if (provider === "pixabay") {
          data = data.concat(pixabayData);
        }
        if (provider === "all") {
          data = data.concat(
            freePikData,
            pexelsData,
            unsplashData,
            pixabayData
          );
          console.log("all", data);
        }
      });

      const formattedData = formatImageData(data);

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
  filters?: { order: string; provider: string };
}) => {
  connectToRedis();
  const order = filters?.order || "relevance";
  let provider = filters?.provider || "all";
  const arrayOfProviders = provider.split(",");
  if (arrayOfProviders.length === 4) {
    provider = "all";
  }
  const cacheKey = `photos:${
    query === "" ? "all" : query
  }:${page}:filters:${provider}:${order}`;

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
  if (data.length === 0) {
    return [];
  }
  await redisClient.set(cacheKey, JSON.stringify(data), { EX: 10800 });
 
  return data;
};
