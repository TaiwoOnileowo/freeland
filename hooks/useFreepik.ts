import { getFreepikDownloadUrl } from "@/lib/actions.ts/freepik.actions";
import React from "react";

const useFreepik = () => {
  const handleFreepikDownload = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    photoId: string
  ) => {
    e.preventDefault();
    try {
      const downloadUrl = await getFreepikDownloadUrl(photoId);
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      console.log(downloadUrl, "downloadUrl");
      const objectUrl = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.setAttribute("download", `${photoId}.zip`);
      document.body.appendChild(anchor);
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

export default useFreepik;
