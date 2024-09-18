import React from "react";
import { getUnsplashDownloadUrl } from "@/lib/actions.ts/unsplash.action";
const useUnsplash = () => {
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
      console.error("Error downloading Unsplash photo", error);
    }
  };
  return {
    handleUnsplashDownload,
  };
};

export default useUnsplash;
