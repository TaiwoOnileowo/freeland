import Navbar from "@/components/Navbar";
import React, { useEffect } from "react";
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
  };
}) => {
  const { query, kingdom } = searchParams;
  console.log(kingdom, "kingdom");

  return (
    <div className="h-[100vh]">
      <Navbar />
      <SearchHeader query={query} key={query} activeKingdom={kingdom} />
      <div className="grid-container">
        <hr className="border-b-[0.5px] border-b-gray-300 w-full mt-2" />
        <FiltersHeader />
        <Filters />
        <SearchContainer activeKingdom={kingdom} query={query} />
      </div>
    </div>
  );
};

export default Page;
