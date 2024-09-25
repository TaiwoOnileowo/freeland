"use client";
import React, { useState } from "react";
import FiltersHeader from "@/components/Search/FiltersHeader";

import Filters from "@/components/Search/Filters";
const FiltersContainer = () => {
  const [showFilters, setShowFilters] = useState(false);

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };
  return (
    <>
      <FiltersHeader
        showFilters={showFilters}
        onToggleFilters={handleToggleFilters}
      />
      {showFilters && <Filters />}
    </>
  );
};

export default FiltersContainer;
