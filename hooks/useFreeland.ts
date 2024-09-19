import React from "react";
import { Photo } from "@/types";
const useFreeland = () => {
  const handlePhotoDownload = async (photo: Photo) => {
    console.log(photo, "photo");
    const response = await fetch(photo.url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.setAttribute("download", `${photo.id}.jpg`);
    document.body.appendChild(anchor);
    console.log(anchor, "anchor");
    anchor.click();
    console.log(anchor, "anchor");
    document.body.removeChild(anchor);
    URL.revokeObjectURL(objectUrl);
  };

  return {
    handlePhotoDownload,
  };
};

export default useFreeland;
