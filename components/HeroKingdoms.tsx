import Link from "next/link";
import React from "react";

const kingdoms = [
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
const HeroKingdoms = () => {
  return (
    <div className="mt-6">
      <h2 className="text-white font-open_sans text-center mb-2 text-xs">
        Top kingdoms
      </h2>

      <div className="flex gap-2 ">
        {kingdoms.map((kingdom, index) => (
          <Link
            key={index}
            href={kingdom.url}
            title={`Browse free ${kingdom}`}
            className="rounded-md text-white bg-white/15 backdrop-blur-[60px] py-1.5 p-4  hover:bg-white/20  transition-all cursor-pointer"
          >
            {kingdom.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroKingdoms;
