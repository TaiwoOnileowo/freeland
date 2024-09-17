import herobg from "@/public/hero-smile1.jpg";
import Image from "next/image";
import Search from "./Search/SearchBar";
import HeroCategories from "./HeroCategories";
export default function Hero() {
  const allCategories = ["All", "Images", "Movies", "Games", "eBooks"];
  return (
    <div className="h-[65vh] relative   bg-primary-light flex flex-col p-24 items-center px-4 ">
      <Image
        src={herobg}
        layout="fill"
        objectFit="cover"
        alt="Free resources - images, books, software, and more"
      />

      <div className="absolute inset-0 bg-black/50"></div>
      <div className="mt-10 flex flex-col items-center justify-center z-[10]">
        <h1 className="text-center text-white text-5xl font-bold font-roboto">
          Find Everything You Need, Free
        </h1>
        <h2 className="text-lg mt-4 text-center  text-white font-sans">
          Explore the web's best free content—images, books, software, and
          more—all in one place.
        </h2>
      </div>
      <div className="z-10 w-full max-w-4xl mt-8 items-center flex flex-col justify-center">
        <Search categories={allCategories} />
        <HeroCategories />
      </div>
    </div>
  );
}
