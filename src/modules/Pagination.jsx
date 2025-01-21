// const Pagination = ({ total, currentPage, onPageChange }) => {
//   const totalPages = Math.ceil(total / 6);

//   return (
//     <div className="flex justify-center mt-4">
//       {Array.from({ length: totalPages }, (_, index) => (
//         <button
//           key={index}
//           className={`px-3 py-1 border rounded-md ${
//             currentPage === index + 1
//               ? "bg-blue-500 text-white"
//               : "bg-white text-gray-700"
//           }`}
//           onClick={() => onPageChange(index + 1)}
//         >
//           {index + 1}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Pagination;




import React from "react";

const Pagination = ({ total, currentPage, onPageChange, limit }) => {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
