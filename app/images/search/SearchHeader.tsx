"use client";
import React, { useEffect, useState } from "react";
import Search from "@/components/Search/SearchBar";
import { motion } from "framer-motion";
const SearchHeader = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const imageCategories = [
    "All",
    "Illustrations",
    "Icons",
    "Patterns",
    "Photos",
  ];
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const hasScrolled = scrollPosition > 50;
  return (
    <div className={`px-4 py-2  bg-white ${hasScrolled ? "fixed" : "sticky"} w-full top-0 z-20 flex gap-3 items-center`}>
      <motion.h1
        className="text-3xl font-bold"
        initial={{ y: -50, display: "none" }}
        animate={{
          y: hasScrolled ? 0 : -50,
          display: hasScrolled ? "block" : "none",
        }}
        transition={{ duration: 0.1 }}
      >
        FREELAND
      </motion.h1>
      <Search categories={imageCategories} background="bg-gray-200" />
    </div>
  );
};

export default SearchHeader;
