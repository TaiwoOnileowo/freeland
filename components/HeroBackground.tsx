import React from "react";
import Image from "next/image";
import image1 from "../public/images/1.jpg";
import image2 from "../public/images/2.jpg";
import image3 from "../public/images/3.jpg";
import image4 from "../public/images/4.jpg";
import image5 from "../public/images/5.jpg";
import image6 from "../public/images/6.jpg";
import image7 from "../public/images/7.jpg";
import image8 from "../public/images/8.jpg";
import image9 from "../public/images/9.jpg";
import image10 from "../public/images/10.jpg";
import image11 from "../public/images/11.jpg";
import image12 from "../public/images/12.jpg";
const IMAGES = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
];
const HeroBackground = () => {
  const getRandomImage = () => {
    return IMAGES[Math.floor(Math.random() * IMAGES.length)];
  };
  return (
    <Image
      src={getRandomImage()}
      alt="Free resources - images, books, software, and more"
      className="absolute inset-0 z-0 w-full h-full object-cover"
      priority
    />
  );
};

export default HeroBackground;
