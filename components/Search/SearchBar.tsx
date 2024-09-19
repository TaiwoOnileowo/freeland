"use client";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
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
import { usePathname } from "next/navigation";
import Image from "next/image";
const kingdoms = ["All Kingdoms", "Images", "Movies", "Games", "eBooks"];
const SearchBar = ({
  query = "",
  background,
  kingdom = "All Kingdoms",
}: {
  query?: string;
  background?: string;
  kingdom?: string;
}) => {
  const pathName = usePathname();
  const handleLowerCase = (value: string) => {
    return value?.toLowerCase();
  };
  const { photoQuery, setPhotoQuery } = useAppContext();

  const [searchInput, setSearchInput] = useState(query);
  const [activeKingdom, setActiveKingdom] = useState(kingdom);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleKingdomChange = (value: string) => {
    setActiveKingdom(value);
    if (pathName === "/search") {
      router.push(
        `/search?kingdom=${encodeURIComponent(
          handleLowerCase(value)
        )}&query=${encodeURIComponent(searchInput)}`
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(
      `/search?kingdom=${encodeURIComponent(
        handleLowerCase(activeKingdom)
      )}&query=${encodeURIComponent(searchInput)}`
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const clearInput = () => {
    setSearchInput("");
  };
  const clearPhotoQuery = () => {
    setPhotoQuery(null);
  };
  const capitalize = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  return (
    <div
      className={`w-full  h-12 font-open_sans  rounded-md  flex gap-2 ${
        background ?? "bg-white"
      } px-3 `}
    >
      <div className="py-1">
        <Select onValueChange={(value) => handleKingdomChange(value)}>
          <SelectTrigger className={`w-[150px] ${background ?? "bg-white"}`}>
            <SelectValue
              placeholder={capitalize(activeKingdom)}
              className="text-black "
            />
          </SelectTrigger>
          <SelectContent>
            {kingdoms.map((kingdom, index) => (
              <SelectItem key={index} value={kingdom.toLowerCase()}>
                {kingdom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <hr className="border-gray-300 border h-full" />
      <form
        className="w-full h-full py-1 flex justify-between items-center"
        aria-label="Search Free Resources"
        onSubmit={handleSubmit}
      >
        {photoQuery ? (
          <div className="bg-white h-full gap-2 rounded-xl p-1 flex items-center justify-center text-sm text-gray-600">
            <Image
              src={photoQuery.url}
              width={50}
              height={50}
              alt={photoQuery.alt}
              className="rounded-xl shadow-md"
              loading="eager"
              priority={true}
            />

            <p>Uploaded Image</p>
            <IoClose onClick={clearPhotoQuery} className="cursor-pointer" />
          </div>
        ) : (
          <input
            type="text"
            value={searchInput}
            onChange={handleChange}
            autoComplete="off"
            className={`w-full h-full p-2 text-black outline-none border-none px-4 ${
              background ?? "bg-white"
            } `}
            placeholder={
              handleLowerCase(activeKingdom) !== "all kingdoms"
                ? `Search all ${activeKingdom}...`
                : "Search all kingdoms..."
            }
            aria-label={`Search ${activeKingdom}`}
          />
        )}

        <div className="flex items-center gap-4 h-full">
          <div
            className={`flex h-full items-center justify-center px-2 gap-3 ${
              searchInput ? "opacity-100" : "opacity-0"
            }`}
          >
            <IoClose
              size={18}
              className="text-black/90 cursor-pointer"
              onClick={clearInput}
            />
            <hr className="border-gray-300 border h-[60%]" />
          </div>
          <button
            className="h-full w-[100px] font-open_sans  rounded-md justify-center   gap-2 bg-blue-500 text-white flex items-center "
            type="submit"
          >
            <IoIosSearch />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
