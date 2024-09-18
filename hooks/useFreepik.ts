import React from "react";
import { getFreepikDownloadUrl } from "@/lib/actions.ts/freepik.actions";
const useFreePik = () => {
  const handleFreepikDownload = async (photoId: number) => {
    try {
      const downloadUrl = await getFreepikDownloadUrl(Number(photoId));
      console.log(downloadUrl, "downloadUrl");
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      console.log(downloadUrl, "downloadUrl");
      const objectUrl = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.setAttribute("download", `${photoId}.zip`);
      document.body.appendChild(anchor);
      console.log(anchor, "anchor");
      anchor.click();
      document.body.removeChild(anchor);

      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Error downloading Freepik photo", error);
    }
  };
  return {
    handleFreepikDownload,
  };
};

export default useFreePik;
