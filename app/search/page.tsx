"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import FiltersHeader from "@/components/Search/FiltersHeader";
import SearchContainer from "@/components/Search/SearchContainer";
import Filters from "@/components/Search/Filters";
import SearchHeader from "@/components/Search/SearchHeader";

const Page = ({
  searchParams,
}: {
  searchParams: {
    query: string;
    kingdom: string;
    order: string;
  };
}) => {
  const { query, kingdom, order } = searchParams;
  const [showFilters, setShowFilters] = useState(false);
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };
  const filters = {
    order,
  };

  return (
    <div className="min-h-[100vh] z-[20]">
      <Navbar />
      <SearchHeader query={query} key={query} activeKingdom={kingdom} />
      <div className="grid-container ">
        <hr className="border-b-[0.5px] border-b-gray-300 w-full mt-2" />
        <FiltersHeader
          showFilters={showFilters}
          onToggleFilters={handleToggleFilters}
        />
        {showFilters && <Filters />}
        <SearchContainer activeKingdom={kingdom} query={query} filters={filters} />
      </div>
    </div>
  );
};

export default Page;
