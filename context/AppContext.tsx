"use client";
import { AppContextType } from "@/types";
import React, { createContext } from "react";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activeKingdom, setActiveKingdom] = React.useState("All Kingdoms");
  return (
    <AppContext.Provider
      value={{
        activeKingdom,
        setActiveKingdom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
