import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const Pagination = ({
  page,
  totalPages,
  onNext,
  onPrevious,
}: {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}) => {
  return (
    <div className="flex justify-center text-sm space-x-4 mt-6 items-center">
      {!(page === 1) && (
        <button
          onClick={onPrevious}
          disabled={page === 1}
          className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2 text-white px-4 py-2 rounded-md"
        >
          <FaArrowLeft /> Previous
        </button>
      )}

      <span className="text-gray-700">
        Page {page} of {totalPages}
      </span>
      {!(page === totalPages) && (
        <button
          onClick={onNext}
          disabled={page === totalPages}
          className="bg-blue-500 hover:bg-blue-600 text-white  flex items-center gap-2 px-4 py-2 rounded-md"
        >
          Next
          <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
