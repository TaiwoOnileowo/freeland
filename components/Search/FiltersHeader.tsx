import React from "react";
import { MdTune } from "react-icons/md";
import { GoSidebarExpand } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
const FiltersHeader = ({
  showFilters,
  onToggleFilters,
}: {
  showFilters: boolean;
  onToggleFilters: () => void;
}) => {
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
  console.log(showFilters, "showFilters");
  return (
    <div className="bg-white font-open_sans z-[25] font-medium  p-2 px-4 border-b-[0.5px] border-b-gray-300 gap-4  items-center grid-topbar flex sticky top-[60px] ">
      {showFilters ? (
        <>
          <div className="flex justify-between gap-4 items-center w-[220px] h-fit font-roboto font-medium text-gray-800">
            <p className="flex gap-2 items-center">
              <span>
                <MdTune />
              </span>
              Filters
            </p>
            <GoSidebarExpand
              className="cursor-pointer"
              onClick={onToggleFilters}
            />
          </div>
          <hr className="border-r-[0.5px] border-gray-300 h-full" />
        </>
      ) : (
        <span
          className="text-gray-800  flex items-center gap-2 cursor-pointer  py-2 px-4 text-sm bg-blue-100 rounded-md"
          onClick={onToggleFilters}
        >
          <MdTune /> Filters
        </span>
      )}

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
  );
};

export default FiltersHeader;
