import Navbar from "@/components/Navbar";
import React from "react";

import SearchContainer from "@/components/Search/SearchContainer";

import SearchHeader from "@/components/Search/SearchHeader";
import FiltersContainer from "@/components/Search/FiltersContainer";

const Page = ({
  searchParams,
}: {
  searchParams: {
    query: string;
    kingdom: string;
    order: string;
    pr: string;
  };
}) => {
  const { query, kingdom, order, pr } = searchParams;

  const filters = {
    order,
    provider: pr || "all",
  };

  return (
    <div className="min-h-[100vh] z-[20]">
      <Navbar />
      <SearchHeader query={query} key={query} activeKingdom={kingdom} />
      <div className="grid-container ">
        <hr className="border-b-[0.5px] border-b-gray-300 w-full mt-2" />
        <FiltersContainer />
        <SearchContainer
          activeKingdom={kingdom}
          query={query}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default Page;
