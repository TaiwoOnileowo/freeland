import HeroKingdoms from "./HeroKingdoms";
import HeroBackground from "./HeroBackground";
import SearchBar from "./Search/SearchBar";
export default function Hero() {
  return (
    <div className="h-[65vh] relative bg-primary-light flex flex-col p-24 items-center px-4 ">
      <HeroBackground />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="mt-10 flex flex-col items-center justify-center z-[10]">
        <h1 className="text-center text-white text-5xl font-bold font-roboto">
          Your Go-to Source for Free Resources
        </h1>
        <h2 className="text-lg mt-4 text-center  text-white font-open_sans">
          Explore the web's best free content—images, books, software, and
          more—all in one place.
        </h2>
      </div>
      <div className="z-10 w-full max-w-4xl mt-10 items-center flex flex-col justify-center">
        <SearchBar />
        <HeroKingdoms />
      </div>
    </div>
  );
}
