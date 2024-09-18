"use client";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoClose } from "react-icons/io5";
import { fetchPhotos } from "@/lib/actions.ts/fl_universal.actions";
import { useAppContext } from "@/context";
const SearchBar = ({
  categories,
  background,
}: {
  categories: string[];
  background?: string;
}) => {
  const { photoData, setPhotoData, loading, setLoading } = useAppContext();
  const [searchInput, setSearchInput] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleCategoryChange = (value: string) => {
    setSearchCategory(value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const photos = await fetchPhotos({
      page: 1,
      perPage: 30,
      searchTerm: searchInput,
    });
    setPhotoData(photos || []);
    setLoading(false);
  };
  return (
    <div
      className={`w-full  h-14 font-sans  rounded-md  flex gap-2 ${
        background ?? "bg-white"
      } px-3 `}
    >
      <div className="py-2">
        <Select onValueChange={(value) => handleCategoryChange(value)}>
          <SelectTrigger className={`w-[150px] ${background ?? "bg-white"}`}>
            <SelectValue placeholder={categories[0]} className="text-black" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <hr className="border-gray-200 border h-full" />
      <form
        className="w-full h-full py-2"
        aria-label="Search Free Resources"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={searchInput}
          onChange={handleChange}
          autoComplete="off"
          className={`w-full h-full p-2 outline-none border-none px-4 ${
            background ?? "bg-white"
          } `}
          placeholder={
            searchCategory.toLowerCase() !== "all"
              ? `Search all ${searchCategory}...`
              : "Search all resources..."
          }
          aria-label={`Search ${searchCategory}`}
        />
      </form>

      <div
        className={`flex h-full items-center justify-center px-2 gap-3 ${
          searchInput ? "opacity-100" : "opacity-0"
        }`}
      >
        <IoClose size={18} className="text-black/90" />
        <hr className="border-gray-300 border h-[60%]" />
      </div>

      <div className="w-[150px] h-full py-2">
        <button className="h-full w-full  rounded-md justify-center   gap-2 bg-blue-500 text-white flex items-center ">
          <IoIosSearch />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
