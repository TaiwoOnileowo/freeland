import Link from "next/link";
import React from "react";

import NavList from "./NavList";
const Navbar = () => {
  return (
    <nav className="flex justify-between  text-sm font-medium font-sans py-4  top-0 w-full px-4">
      <div className="flex items-center gap-12">
        <h1 className="text-3xl font-bold">FREELAND</h1>
        <NavList />
      </div>
      <ul className="flex gap-6 items-center">
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <hr className="border border-gray-100/50 h-[70%]" />
        <li>
          <button>Contact Us</button>
        </li>
        <li>
          <button>Join Us</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
