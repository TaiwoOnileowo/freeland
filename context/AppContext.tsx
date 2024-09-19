"use client";
import { AppContextType, Photo } from "@/types";
import React, { useState, createContext } from "react";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [photoQuery, setPhotoQuery] = useState<Photo | null>(null);
  return (
    <AppContext.Provider
      value={{
        photoQuery,
        setPhotoQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
