"use client";
import React, { useState, useEffect } from "react";

import { Photo } from "@/types";
import usePagination from "@/hooks/usePagination";
import Pagination from "../Pagination";

import { fetchPhotos } from "@/lib/actions.ts/fl_universal.actions";
import { useAppContext } from "@/context";
import ImageResults from "./ImageResults";
const SearchContainer = ({
  query = "",
  activeKingdom = "All Kingdoms",
}: {
  query?: string;
  activeKingdom: string;
}) => {
  const lowercaseActiveKingdom = activeKingdom.toLowerCase();
  console.log(lowercaseActiveKingdom, "lowercaseActiveKingdom", query, "query");
  const { page, totalPages, perPage, handleNextPage, handlePreviousPage } =
    usePagination();
  const [data, setData] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (lowercaseActiveKingdom === "images") {
        console.log("fetching images");
        const photos = await fetchPhotos({ page, perPage, query });
        console.log(photos, "photos");
        setData(photos || []);
        setLoading(false);
      }
    };
    fetchData();
  }, [page, perPage, query, lowercaseActiveKingdom]);

  return (
    <div className="w-full px-6 flex flex-col grid-result ">
      {lowercaseActiveKingdom === "images" && (
        <ImageResults photos={data} loading={loading} />
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
      />
    </div>
  );
};

export default SearchContainer;
