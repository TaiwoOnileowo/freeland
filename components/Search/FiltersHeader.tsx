import React from "react";
import { MdTune } from "react-icons/md";
import { GoSidebarExpand } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
const FiltersHeader = () => {
  const relatedSearches = [
    "Food",
    "Restaurants",
    "Cafe",
    "Dine-out",
    "Nightlife",
    "Delivery",
    "Takeaway",
    "Cinemas",
    "Activities",
    "Spas",
  ];
  return (
    <div className="bg-white   border-b-[0.5px] border-b-gray-300 gap-4  items-center grid-topbar flex sticky top-[72px] z-20">
      <div className="flex justify-between gap-4 p-3 items-center w-[220px] h-fit font-roboto font-medium text-gray-800">
        <p className="flex gap-2 items-center">
          <span>
            <MdTune />
          </span>
          Filters
        </p>
        <GoSidebarExpand className="cursor-pointer" />
      </div>
      <hr className="border-r-[0.5px] border-gray-300 ml-3 h-full" />
      <div className="p-3">
        <div className="flex gap-4">
          {relatedSearches.map((search, index) => (
            <span
              key={index}
              className="text-gray-800 flex items-center gap-2 cursor-pointer  py-2 px-4 text-sm border border-gray-300 rounded-md"
            >
              <IoIosSearch />
              {search}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltersHeader;
