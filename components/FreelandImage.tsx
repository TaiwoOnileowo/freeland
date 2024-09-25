"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineFileDownload } from "react-icons/md";
import useUnsplash from "@/hooks/useUnsplash";
import Link from "next/link";
import Image from "next/image";
import useFreepik from "@/hooks/useFreepik";
import useFreeland from "@/hooks/useFreeland";
import { Skeleton } from "@mui/material";
import { Photo } from "@/types";
import { GoStack } from "react-icons/go";
import { useAppContext } from "@/context";
const FreelandImage = ({ photo, index }: { photo: Photo; index: number }) => {
  const router = useRouter();
  const loadedImages = useRef(new Set<string>());
  const [imageLoading, setImageLoading] = useState(true);
  const { setPhotoQuery } = useAppContext();
  const { handleUnsplashDownload } = useUnsplash();
  const { handlePhotoDownload } = useFreeland();
  const { handleFreepikDownload } = useFreepik();

  const handleViewSimilar = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    photo: Photo
  ) => {
    e.preventDefault();
    setPhotoQuery(photo);
    router.push(
      `/search?kingdom=images&query=${encodeURIComponent(photo.alt)}`
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Check if the image has already been loaded
    if (loadedImages.current.has(photo.url)) {
      setImageLoading(false);
    }
  }, [photo.url]);

  const handleImageLoad = () => {
    // Mark this image as loaded
    loadedImages.current.add(photo.url);
    setImageLoading(false);
  };

  return (
    <figure
      key={photo.id}
      className="mb-4 cursor-pointer rounded-md font-open_sans"
    >
      <Link href={photo.freeland_url} className="relative group">
        <div className="bg-gradient-to-b from-black/30 via-transparent to-black/30 rounded-md inset-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs duration-300 ease-in-out absolute">
          <div className="flex items-end text-white p-3 w-full justify-between h-full">
            <div
              className="flex gap-3 items-center border border-white rounded-full p-2 hover:bg-white/20"
              onClick={(e) => handleViewSimilar(e, photo)}
            >
              <GoStack size={16} />
              <p>View Similar</p>
            </div>
            <p className="flex gap-2 items-center">
              <span className="rounded-full w-6 h-6 flex items-center justify-center bg-white">
                <Image
                  src={photo.provider_logo}
                  width={15}
                  height={15}
                  alt={photo.provider}
                  className="rounded-full"
                />
              </span>
              <span className="capitalize">{photo.provider}</span>
            </p>
            <span
              className="bg-white text-black absolute top-2 right-2 z-[20] hover:bg-gray-100 rounded-md w-8 h-8 flex items-center justify-center text-sm"
              onClick={(e) => {
                e.preventDefault();
                if (
                  photo.provider === "Pexels" ||
                  photo.provider === "PixaBay"
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
          priority={index < 5}
          loading={index < 5 ? "eager" : "lazy"}
          width={photo.width}
          height={photo.height}
          alt={photo.alt ?? "Download this image for free"}
          blurDataURL={photo.blur_hash || ""}
          placeholder={photo.blur_hash ? "blur" : undefined}
          className={`w-full h-full object-cover rounded-md transition-all duration-500 ease-in-out`}
          onLoad={handleImageLoad}
        />

        {imageLoading && !photo.blur_hash && (
          <Skeleton
            key={index}
            variant="rectangular"
            animation="wave"
            width="100%"
            height={photo.height}
            className={`w-full h-full object-cover rounded-md transition-all duration-500 ease-in-out`}
          />
        )}
      </Link>
    </figure>
  );
};

export default FreelandImage;
