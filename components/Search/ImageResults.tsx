import React from "react";
import { Skeleton } from "@mui/material";
import FreelandImage from "../FreelandImage";
import { Photo } from "@/types";
const ImageResults = ({
  photos,
  loading,
}: {
  photos: Photo[][];
  loading: boolean;
}) => {
  console.log(photos);
  return (
    <>
      {photos.length === 4 &&
      photos[0].length === 0 &&
      photos[1].length === 0 &&
      photos[2].length === 0 &&
      photos[3].length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl text-gray-500">No images found</p>
        </div>
      ) : (
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
                photos[index].map((photo, idx) => {
                  return (
                    <FreelandImage key={photo.id} photo={photo} index={idx} />
                  );
                })
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ImageResults;
