import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
const imageCatergories = [
  {
    heading: "Popular Categories",
    links: [
      {
        title: "Business",
        url: "business",
      },
      {
        title: "Nature",
        url: "nature",
      },
      {
        title: "People",
        url: "people",
      },
      {
        title: "Technology",
        url: "technology",
      },
      {
        title: "Travel",
        url: "travel",
      },
      {
        title: "Food",
        url: "food",
      },
      {
        title: "Abstract",
        url: "abstract",
      },
      {
        title: "Animals",
        url: "animals",
      },
      {
        title: "Sports",
        url: "sports",
      },
      {
        title: "Education and learning",
        url: "education-and-learning",
      },
      {
        title: "Fashion",
        url: "fashion",
      },
      {
        title: "Health",
        url: "health",
      },
      {
        title: "Interiors",
        url: "interiors",
      },
      {
        title: "Street",
        url: "street",
      },
      {
        title: "Wallpapers",
        url: "wallpapers",
      },

      {
        title: "Work",
        url: "work",
      },
    ],
  },
  {
    heading: "Trending Searches",
    links: [
      {
        title: "Independence Day",
        url: "/images/independence-day",
      },
      {
        title: "Nature",
        url: "/images/nature",
      },
      {
        title: "Ai",
        url: "/images/ai",
      },

      {
        title: "Pilot",
        url: "/images/pilot",
      },
      {
        title: "Business Culture",
        url: "/images/business-culture",
      },
    ],
  },
];
const NavItemLinks = () => {
  return (
    <div className="group-hover:flex  hidden p-6 justify-between h-fit rounded-md bg-black w-[60vw]  absolute top-10 -left-10 z-[100]">
      <IoTriangle className="text-black  absolute -top-4 left-12 text-xl" />
      <div>
        <Link
          className="flex items-center text-white gap-2 hover:text-gray-400"
          href="/images"
        >
          Explore all images
          <span>
            <FaArrowRight />
          </span>
        </Link>
        <div className="flex flex-col gap-2">
          {imageCatergories.map((category, index) => (
            <div key={index} className="max-w-md">
              <h3 className="text-white font-bold text-lg mt-4">
                {category.heading}
              </h3>
              <ul className="flex flex-wrap gap-4 gap-x-6 text-[15px] mt-2">
                {category.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-white hover:text-gray-400"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div
        className=" w-[300px] h-[300px] bg-cover bg-center"
        style={{ backgroundImage: "url('/image-nav-item.jpg')" }}
      ></div>
    </div>
  );
};

export default NavItemLinks;
