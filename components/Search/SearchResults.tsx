"use client";

import React, { useState, useEffect } from "react";

import Skeleton from "@mui/material/Skeleton";
import { shuffleArray } from "@/lib/utils";

import { Photo } from "@/types";
import usePagination from "@/hooks/usePagination";

import Pagination from "../Pagination";
import FreelandImage from "../FreelandImage";

const SearchResults = () => {
  const { page, totalPages, perPage, handleNextPage, handlePreviousPage } =
    usePagination();
  const [data, setData] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      setLoading(true);

      try {
        const unsplashResponse = await fetch(
          `/api/unsplash-photos?page=${page}&per_page=${perPage}`,
          { signal }
        );

        const pexelsResponse = await fetch(
          `/api/pexels-photos?page=${page}&per_page=${perPage}`,
          { signal }
        );
        const freePikResponse = await fetch(
          `/api/freepik-photos?page=${page}&per_page=${perPage}`,
          { signal }
        );
        const unsplashData = await unsplashResponse.json();

        const pexelsData = await pexelsResponse.json();
        const freePikData = await freePikResponse.json();
        console.log(unsplashData, "unsplashData");
        console.log(freePikData, "freePikData");
        console.log(pexelsData, "pexelsData");
        if (!signal.aborted) {
          setData((prevData) => {
            const combinedData = [
              ...unsplashData,
              ...pexelsData,
              ...freePikData,
            ];
            return shuffleArray(Array.from(new Set(combinedData)));
          });
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error("Error fetching photos:", error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }

      return () => controller.abort();
    };

    fetchPhotos();
  }, [page, perPage]);

  const dataLengthQuarter = data.length / 4;
  const firstData = data.slice(0, dataLengthQuarter);
  const secondData = data.slice(dataLengthQuarter, dataLengthQuarter * 2);
  const thirdData = data.slice(dataLengthQuarter * 2, dataLengthQuarter * 3);
  const fourthData = data.slice(dataLengthQuarter * 3, data.length);
  const displayedData = [fourthData, thirdData, secondData, firstData];
  console.log(displayedData, "displayedData");
  console.log(data.length, "data.length");
  return (
    <div className="w-full px-6 flex flex-col grid-result ">
      <div className="flex ">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-1/4 p-2">
            {loading ? (
              <div className="flex flex-col gap-6">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height={300}
                    className="rounded-md"
                  />
                ))}
              </div>
            ) : (
              displayedData[index].map((photo, idx) => {
                return (
                  <FreelandImage key={photo.id} photo={photo} index={idx} />
                );
              })
            )}
          </div>
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
      />
    </div>
  );
};

export default SearchResults;
