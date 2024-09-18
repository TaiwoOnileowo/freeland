import React from "react";
import { Photo } from "@/types";
const usePexels = () => {
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
  return {
    handlePexelsDownload,
  };
};

export default usePexels;
