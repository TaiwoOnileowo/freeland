import { motion } from "framer-motion";
import React from "react";

export default function SearchMarquee() {
  const categoriesLine1 = [
    "Free Images",
    "Free eBooks",
    "Free Software",
    "Free Courses",
    "Free Fonts",
    "Free Templates",
    "Free Videos",
    "Free Music",
    "Free Tools",
    "Free Icons",
  ];
  const categoriesLine2 = [
    "Free Templates",
    "Free Videos",
    "Free Music",
    "Free Tools",
    "Free Icons",
    "Free Images",
    "Free eBooks",
    "Free Software",
    "Free Courses",
    "Free Fonts",
  ];

  const marqueeVariantsLine1 = {
    animate: {
      x: ["100%", "-100%"], // Moves from right to left
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 18,
          ease: "linear",
        },
      },
    },
  };

  const marqueeVariantsLine2 = {
    animate: {
      x: ["-100%", "100%"], // Moves from left to right
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 18,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="overflow-hidden py-4 h-28 w-full relative max-w-xl">
      <motion.div
        className="flex space-x-3  absolute top-3 whitespace-nowrap flex-shrink-0"
        variants={marqueeVariantsLine1}
        animate="animate"
      >
        {categoriesLine1.map((category, index) => (
          <span
            key={index}
            className="rounded-full bg-white shadow-md p-3 py-2 hover:border hover:border-blue-500 transition-all cursor-pointer"
          >
            {category}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="flex space-x-3  whitespace-nowrap mt-4 absolute h-10 bottom-2 flex-shrink-0"
        variants={marqueeVariantsLine2}
        animate="animate"
      >
        {categoriesLine2.map((category, index) => (
          <span
            key={index}
            className="rounded-full bg-white shadow-md p-3 py-2 hover:border hover:border-blue-500 transition-all cursor-pointer"
          >
            {category}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
