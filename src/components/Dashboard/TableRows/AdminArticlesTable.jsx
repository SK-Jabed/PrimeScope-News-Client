// import { axiosSecure } from "../../../hooks/useAxiosSecure";



// const AdminArticlesTable = ({ articles, refetch, onOpenDeclineModal }) => {
//   const handleApprove = async (id) => {
//     // Call API to approve the article
//     // await axiosSecure.put(`/articles/${id}/approve`);
//     await axiosSecure.patch(`/articles/approve/${id}`);
//     refetch();
//   };

//   const handleDelete = async (id) => {
//     // Call API to delete the article
//     await axiosSecure.delete(`/articles/${id}`);
//     refetch();
//   };

//   const handleMakePremium = async (id) => {
//     // Call API to make the article premium
//     // await axiosSecure.put(`/articles/${id}/make-premium`);
//     await axiosSecure.patch(`/articles/premium/${id}`);
//     refetch();
//   };

//   return (
//     <table className="table-auto w-full border">
//       <thead className="bg-gray-100">
//         <tr>
//           <th>Title</th>
//           <th>Author</th>
//           {/* <th>Publisher</th> */}
//           <th>Status</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {articles.map((article) => (
//           <tr key={article._id} className="border-b">
//             <td>{article.title}</td>
//             <td>{article.author.name}</td>
//             {/* <td>{article.publisher}</td> */}
//             <td>{article.status}</td>
//             <td>
//               <button
//                 className="btn btn-success mr-2"
//                 onClick={() => handleApprove(article._id)}
//               >
//                 Approve
//               </button>
//               <button
//                 className="btn btn-warning mr-2"
//                 onClick={() => onOpenDeclineModal(article._id)}
//               >
//                 Decline
//               </button>
//               <button
//                 className="btn btn-danger mr-2"
//                 onClick={() => handleDelete(article._id)}
//               >
//                 Delete
//               </button>
//               <button
//                 className="btn btn-info"
//                 onClick={() => handleMakePremium(article._id)}
//               >
//                 Make Premium
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default AdminArticlesTable;


import React from "react";
import { FaCheck, FaTrash, FaStar, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import moment from "moment";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const AdminArticlesTable = ({ articles, refetch, onOpenDeclineModal }) => {
  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/articles/approve/${id}`);
      Swal.fire("Approved!", "The article has been approved.", "success");
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/articles/${id}`);
        Swal.fire("Deleted!", "The article has been removed.", "success");
        refetch();
      }
    });
  };

  const handleMakePremium = async (id) => {
    await axiosSecure.patch(`/articles/premium/${id}`);
    Swal.fire("Premium!", "The article is now premium.", "success");
    refetch();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white border rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Posted Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Publisher</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id} className="border-b">
              <td className="px-4 py-2">{article.title}</td>
              <td className="px-4 py-2 flex items-center space-x-2">
                <img
                  src={article.author.photo}
                  alt={article.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold">{article.author.name}</p>
                  <p className="text-xs text-gray-500">
                    {article.author.email}
                  </p>
                </div>
              </td>
              <td className="px-4 py-2">
                {moment(article.postedDate).format("MMMM D, YYYY")}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 text-xs font-bold rounded-lg ${
                    article.status === "approved"
                      ? "bg-green-200 text-green-800"
                      : article.status === "declined"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {article.status}
                </span>
              </td>
              <td className="px-4 py-2 flex items-center space-x-2">
                <img
                  src={article.publisher.publisherLogo}
                  alt={article.publisher.publisherName}
                  className="w-6 h-6"
                />
                <p>{article.publisher.publisherName}</p>
              </td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  className="btn bg-green-500 hover:bg-green-600"
                  onClick={() => handleApprove(article._id)}
                >
                  <FaCheck />
                </button>
                <button
                  className="btn bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => onOpenDeclineModal(article._id)}
                >
                  <FaTimes />
                </button>
                <button
                  className="btn bg-red-500 hover:bg-red-600"
                  onClick={() => handleDelete(article._id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="btn bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleMakePremium(article._id)}
                >
                  <FaStar />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminArticlesTable;
