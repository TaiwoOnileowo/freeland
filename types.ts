import React from "react";

export interface Photo {
  id: string;
  width: number;
  height: number;
  blur_hash: string;
  alt: string;
  url: string;
  freeland_url: string;
  author: string;
  author_url: string;
  likes: number;
  provider: string;
  provider_logo: string;
  provider_url: string;
}

export interface AppContextType {
  photoQuery: Photo | null;
  setPhotoQuery: React.Dispatch<React.SetStateAction<Photo | null>>;
}
