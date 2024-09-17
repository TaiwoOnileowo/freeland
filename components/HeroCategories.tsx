import Link from "next/link";
import React from "react";

const categories = [
  {
    title: "Images",
    url: "/images",
  },
  {
    title: "Movies",
    url: "/movies",
  },
  {
    title: "Games",
    url: "/games",
  },
  {
    title: "eBooks",
    url: "/ebooks",
  },
];
const HeroCategories = () => {
  return (
    <div className="mt-3">
      <h2 className="text-white font-sans text-center mb-2 text-sm ">Top categories</h2>

      <div className="flex gap-2 ">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={category.url}
            title={`Browse free ${category}`}
            className="rounded-md text-white bg-white/15 backdrop-blur-[60px] py-1.5 p-4  hover:bg-white/20  transition-all cursor-pointer"
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroCategories;
