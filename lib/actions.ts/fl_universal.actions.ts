"use server";
import { Photo } from "@/types";
import { shuffleArray } from "../utils";
import { getFreepikPhotos } from "./freepik.actions";
import { getPexelsPhotos } from "./pexels.actions";
import { getUnsplashPhotos } from "./unsplash.action";
export const fetchPhotos = async ({
  page,
  perPage,

  searchTerm,
}: {
  page: number;
  perPage: number;
  searchTerm?: string;
}) => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const freePikData = await getFreepikPhotos({ page, perPage, signal, searchTerm });
    const pexelsData = await getPexelsPhotos({ page, perPage, signal, searchTerm });
    const unsplashData = await getUnsplashPhotos({ page, perPage, signal , searchTerm});

    if (!signal.aborted) {
      const combinedData = [...freePikData, ...pexelsData, ...unsplashData];
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
