import React from "react";
import { Skeleton } from "@mui/material";
import FreelandImage from "../FreelandImage";
import { Photo } from "@/types";
const ImageResults = ({
  photos,
  loading,
}: {
  photos: Photo[];
  loading: boolean;
}) => {
  const dataLengthQuarter = photos.length / 4;
  const firstData = photos.slice(0, dataLengthQuarter);
  const secondData = photos.slice(dataLengthQuarter, dataLengthQuarter * 2);
  const thirdData = photos.slice(
    dataLengthQuarter * 2,
    dataLengthQuarter * 3
  );
  const fourthData = photos.slice(dataLengthQuarter * 3, photos.length);
  const displayedData = [fourthData, thirdData, secondData, firstData];
  console.log(displayedData, "displayedData");
  console.log(photos.length, "data.length");
  return (
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
              return <FreelandImage key={photo.id} photo={photo} index={idx} />;
            })
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageResults;
