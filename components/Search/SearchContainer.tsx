"use client";
import React, { useState, useEffect } from "react";

import { Photo } from "@/types";
import usePagination from "@/hooks/usePagination";
import Pagination from "../Pagination";
import { getPhotos } from "@/lib/actions.ts/fl_universal.actions";
import { useAppContext } from "@/context";
import ImageResults from "./ImageResults";
import { runBlurhashJob } from "@/jobs/blurhash";

const SearchContainer = ({
  query = "",
  activeKingdom = "All Kingdoms",
  filters,
}: {
  query?: string;
  activeKingdom: string;
  filters?: { order: string };
}) => {
  const lowercaseActiveKingdom = activeKingdom.toLowerCase();
  console.log(lowercaseActiveKingdom, "lowercaseActiveKingdom", query, "query");
  const { page, totalPages, perPage, handleNextPage, handlePreviousPage } =
    usePagination();
  const [data, setData] = useState<Photo[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (lowercaseActiveKingdom === "images") {
        const photos = await getPhotos({ page, perPage, query, filters });

        setData(photos);

        setLoading(false);
      }
    };
    fetchData();
  }, [page, perPage, query, lowercaseActiveKingdom, filters]);
  useEffect(() => {
    const fecthBlurhash = async () => {
      await runBlurhashJob();
      console.log("Done");
    };
    fecthBlurhash();
  }, [data, loading]);
  if (data.length === 0) {
    return (
      <div className="w-full px-6 flex flex-col grid-result   ">
        An error occured
      </div>
    );
  }
  return (
    <div className="w-full px-6 flex flex-col grid-result   ">
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
