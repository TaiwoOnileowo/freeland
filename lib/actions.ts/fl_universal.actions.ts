"use server";
import { Photo } from "@/types";
import { shuffleArray } from "../utils";
import { getFreepikPhotos } from "./freepik.actions";
import { getPexelsPhotos } from "./pexels.actions";
import { getUnsplashPhotos } from "./unsplash.action";
import { getPixabayPhotos } from "./pixabay.actions";
export const fetchPhotos = async ({
  page,
  perPage,

  query,
}: {
  page: number;
  perPage: number;
  query?: string;
}) => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    // const freePikData = await getFreepikPhotos({
    //   page,
    //   perPage,
    //   signal,
    //   query,
    // });
    const pexelsData = await getPexelsPhotos({ page, perPage, signal, query });
    const unsplashData = await getUnsplashPhotos({
      page,
      perPage,
      signal,
      query,
    });
    const pixabayData = await getPixabayPhotos({
      page,
      perPage,
      signal,
      query,
    });
    if (!signal.aborted) {
      const combinedData = [
        // ...freePikData,
        ...pexelsData,
        ...unsplashData,
        ...pixabayData,
      ];
      const shuffledData: Photo[] = shuffleArray(
        Array.from(new Set(combinedData))
      );

      return shuffledData;
    }
  } catch (error) {
    if (!signal.aborted) {
      console.error("Error fetching photos:", error);
    }
  }

  return controller.abort();
};
