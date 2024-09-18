import React, { useState } from "react";

const usePagination = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const perPage = 30;
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return {
    page,
    totalPages,
    perPage,
    handleNextPage,
    handlePreviousPage,
  };
};

export default usePagination;
