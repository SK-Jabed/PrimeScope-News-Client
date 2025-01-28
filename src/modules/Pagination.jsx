import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center mt-6 space-y-4">
      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-purple-500 text-white hover:bg-purple-600 transition duration-200"
          }`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <FaChevronLeft className="text-lg" />
          <span>Prev</span>
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition duration-200 ${
              page === currentPage
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-purple-500 hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-purple-500 text-white hover:bg-purple-600 transition duration-200"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <span>Next</span>
          <FaChevronRight className="text-lg" />
        </button>
      </div>

      {/* Items Per Page Selection */}
      <div className="flex items-center space-x-3">
        <label
          htmlFor="itemsPerPage"
          className="text-sm font-medium text-gray-700"
        >
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-gray-100 text-gray-700"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;

