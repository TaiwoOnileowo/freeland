"use client";
import React from "react";
import NavItemLinks from "./NavItemLinks";
import Link from "next/link";
const NavList = () => {
  const navItems = [
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
    {
      title: "More",
      url: "/more",
    },
  ];

  return (
    <ul className="flex items-center justify-center gap-6">
      {navItems.map((item, index) => (
        <li key={index} className="group relative">
          <Link
            href={item.url}
            className="hover:cursor-default hover:opacity-60"
            onClick={(e) => e.preventDefault()}
          >
            {item.title}
          </Link>
          <NavItemLinks />
        </li>
      ))}
    </ul>
  );
};

export default NavList;
