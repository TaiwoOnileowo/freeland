"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import Skeleton from "@mui/material/Skeleton";

import { getUnsplashDownloadUrl } from "@/lib/actions.ts/unsplash.action";

import { Photo } from "@/types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SearchResults = () => {
  const [data, setData] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [imageLoading, setImageLoading] = useState(false);
  const perPage = 30;

  // Fisher-Yates shuffle algorithm to shuffle the array
  const shuffleArray = (array: Photo[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

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
        const unsplashData = await unsplashResponse.json();

        const pexelsResponse = await fetch(
          `/api/pexels-photos?page=${page}&per_page=30`,
          { signal }
        );
        const pexelsData = await pexelsResponse.json();
        console.log(unsplashData, "unsplashData");
        console.log(pexelsData, "pexelsData");
        if (!signal.aborted) {
          setData((prevData) => {
            const combinedData = [...unsplashData, ...pexelsData];
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

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleUnsplashDownload = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    photoId: string
  ) => {
    e.preventDefault();
    try {
      const downloadUrl = await getUnsplashDownloadUrl(photoId);
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      console.log(downloadUrl, "downloadUrl");
      const objectUrl = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.setAttribute("download", `${photoId}.jpg`);
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Error downloading photo", error);
    }
  };
  const handlePexelsDownload = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    photo: Photo
  ) => {
    const response = await fetch(photo.url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.setAttribute("download", `${photo.id}.jpg`);
    document.body.appendChild(anchor);
    anchor.click();
    console.log(anchor, "anchor");
    document.body.removeChild(anchor);
    URL.revokeObjectURL(objectUrl);
  };

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
                  <figure key={photo.id} className="mb-4 cursor-pointer">
                    <Link href={photo.freeland_url} className="relative group ">
                      <div className="bg-black/10 inset-0 hidden group-hover:block absolute">
                        <div className="flex flex-col p-3 items-end justify-end h-full">
                          <span
                            className="bg-white hover:bg-gray-100 rounded-md w-8 h-8 flex items-center justify-center text-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              if (photo.provider === "Pexels") {
                                handlePexelsDownload(e, photo);
                              } else {
                                handleUnsplashDownload(e, photo.id);
                              }
                            }}
                          >
                            <MdOutlineFileDownload />
                          </span>
                        </div>
                      </div>
                      <Image
                        src={photo.url}
                        priority={
                          idx === 0 || idx === 1 || idx === 3 || idx === 4
                            ? true
                            : false
                        }
                        width={photo.width}
                        height={photo.height}
                        alt={photo.alt ?? "Download this image for free"}
                        blurDataURL={photo.blur_hash ?? undefined}
                        className={`w-full h-full object-cover rounded-md ${
                          !photo.blur_hash && imageLoading ? "hidden" : ""
                        }`}
                        onLoad={() => setImageLoading(false)}
                      />
                      {imageLoading && !photo.blur_hash && (
                        <Skeleton
                          key={idx}
                          variant="rectangular"
                          animation="wave"
                          width="100%"
                          height={300}
                          className="rounded-md"
                        />
                      )}
                    </Link>
                  </figure>
                );
              })
            )}
          </div>
        ))}
      </div>{" "}
      <div className="flex justify-center text-sm space-x-4 mt-6 items-center">
        {!(page === 1) && (
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2 text-white px-4 py-2 rounded-md"
          >
            <FaArrowLeft /> Previous
          </button>
        )}

        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        {!(page === totalPages) && (
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="bg-blue-500 hover:bg-blue-600 text-white  flex items-center gap-2 px-4 py-2 rounded-md"
          >
            Next
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
