import Navbar from "@/components/Navbar";

import React from "react";
import FiltersHeader from "@/components/Search/FiltersHeader";
import SearchResults from "@/components/Search/SearchResults";
import Filters from "@/components/Search/Filters";
import SearchHeader from "./SearchHeader";

const Page = () => {
  return (
    <div className="h-[100vh]">
      <Navbar />
      <SearchHeader />
      
      <div className="grid-container   ">
      <hr className="border-b-[0.5px] border-b-gray-300 w-full mt-2" />
        <FiltersHeader />
        <Filters />
        <SearchResults />
      </div>
    </div>
  );
};

export default Page;
