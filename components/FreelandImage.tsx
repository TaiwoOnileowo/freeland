import React, { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import useUnsplash from "@/hooks/useUnsplash";
import Link from "next/link";
import Image from "next/image";
import useFreepik from "@/hooks/useFreepik";
import useFreeland from "@/hooks/useFreeland";
import { Skeleton } from "@mui/material";
const FreelandImage = ({ photo, index }: { photo: any; index: number }) => {
  const [imageLoading, setImageLoading] = useState(false);

  const { handleUnsplashDownload } = useUnsplash();
  const { handlePhotoDownload } = useFreeland();
  const { handleFreepikDownload } = useFreepik();
  return (
    <figure key={photo.id} className="mb-4 cursor-pointer">
      <Link href={photo.freeland_url} className="relative group ">
        <div className="bg-black/10 inset-0 hidden group-hover:block absolute">
          <div className="flex flex-col p-3 items-end justify-end h-full">
            <span
              className="bg-white hover:bg-gray-100 rounded-md w-8 h-8 flex items-center justify-center text-sm"
              onClick={(e) => {
                e.preventDefault();
                if (
                  photo.provider === "Pexels" ||
                  photo.provider === "Pixabay"
                ) {
                  handlePhotoDownload(photo);
                } else if (photo.provider === "Freepik") {
                  handleFreepikDownload(photo.id);
                } else if (photo.provider === "Unsplash") {
                  handleUnsplashDownload(photo.id);
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
            index === 0 || index === 1 || index === 3 || index === 4
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
            key={index}
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
};

export default FreelandImage;
