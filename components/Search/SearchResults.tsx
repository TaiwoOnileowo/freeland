"use client";
import React, { useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import { Photo } from "@/types";
import usePagination from "@/hooks/usePagination";
import Pagination from "../Pagination";
import FreelandImage from "../FreelandImage";
import { fetchPhotos } from "@/lib/actions.ts/fl_universal.actions";
import { useAppContext } from "@/context";
const SearchResults = () => {
  const { page, totalPages, perPage, handleNextPage, handlePreviousPage } =
    usePagination();
  const { photoData, setPhotoData, loading, setLoading } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const photos = await fetchPhotos({ page, perPage });
      console.log(photos, "photos");
      setPhotoData(photos || []);
      setLoading(false);
    };
    fetchData();
  }, [page, perPage]);

  const dataLengthQuarter = photoData.length / 4;
  const firstData = photoData.slice(0, dataLengthQuarter);
  const secondData = photoData.slice(dataLengthQuarter, dataLengthQuarter * 2);
  const thirdData = photoData.slice(
    dataLengthQuarter * 2,
    dataLengthQuarter * 3
  );
  const fourthData = photoData.slice(dataLengthQuarter * 3, photoData.length);
  const displayedData = [fourthData, thirdData, secondData, firstData];
  console.log(displayedData, "displayedData");
  console.log(photoData.length, "data.length");
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
