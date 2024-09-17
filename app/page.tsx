import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import React from "react";

const Page = () => {
  return (
    <div className="text-white ">
      <div className="fixed top-0 z-20 w-full">
        <Navbar />
      </div>
      <Hero />
    </div>
  );
};

export default Page;
