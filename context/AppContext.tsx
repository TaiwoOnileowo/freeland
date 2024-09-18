"use client";
import { AppContextType, Photo } from "@/types";
import React, { createContext } from "react";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [photoData, setPhotoData] = React.useState<Photo[]>([]);
  const [loading, setLoading] = React.useState(false);
  return (
    <AppContext.Provider
      value={{
        photoData,
        setPhotoData,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
