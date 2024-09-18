import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { imageCategories } from "@/lib/data";
import smile from "@/public/images/categories/smile.jpg";
import Image, { StaticImageData } from "next/image";
const NavItemLinks = () => {
  const [activeImage, setActiveImage] = useState(smile);
  const handleHover = (image: StaticImageData) => {
    setActiveImage(image);
  };
  console.log(activeImage);
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
          {imageCategories.map((category, index) => (
            <div key={index} className="max-w-md">
              <h3 className="text-white font-bold text-lg mt-4">
                {category.heading}
              </h3>
              <ul className="flex flex-wrap gap-4 gap-x-6 text-[15px] mt-2">
                {category.links.map((link, index) => {
                  let href;
                  if (typeof link === "object" && "title" in link) {
                    href = `/explore-images/${link.title.toLowerCase()}`;
                  } else {
                    href = `/search?kingdom=images&query=${link}`;
                  }
                  const linkImage =
                    typeof link === "object" && "image" in link
                      ? link.image
                      : smile;
                      const linkTitle = typeof link === "object" && "title" in link ? link.title : link;
                  return (
                    <li key={index}>
                      <Link
                        href={href}
                        onMouseEnter={() => handleHover(linkImage)}
                        className="text-white hover:text-gray-400"
                      >
                        {linkTitle}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className=" w-[300px] h-[300px] bg-cover bg-center">
        <Image
          src={activeImage}
          alt="active image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default NavItemLinks;
