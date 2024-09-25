"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/Search/SearchBar";
import { motion } from "framer-motion";

const SearchHeader = ({
  query,
  activeKingdom,
 
}: {
  query: string;
  activeKingdom: string;
  
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  // Throttle scroll events
  useEffect(() => {
    const throttleScroll = () => {
      let lastScroll = 0;
      return () => {
        const now = window.scrollY;
        if (now - lastScroll > 10 || lastScroll - now > 10) {
          handleScroll();
          lastScroll = now;
        }
      };
    };
    const throttledScroll = throttleScroll();
    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  const hasScrolled = scrollPosition > 50;

  return (
    <div
      className={`px-4 py-2 sticky bg-white w-full top-0 z-30 flex gap-3 items-center`}
    >
      <motion.h1
        className="text-3xl font-bold"
        initial={{ y: -50, display: "none" }}
        animate={{
          y: hasScrolled ? 0 : -50,
          display: hasScrolled ? "block" : "none",
        }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        FREELAND
      </motion.h1>
      <motion.div
        className="flex-1"
        initial={{ width: "100%" }}
        animate={{ width: hasScrolled ? "100%" : "80%" }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <SearchBar
          background="bg-gray-200"
          query={query}
          kingdom={activeKingdom}
        />
      </motion.div>
    </div>
  );
};

export default SearchHeader;
