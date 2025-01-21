// import { Helmet } from "react-helmet-async";
// import AllArticlesDataRow from "../../../components/Dashboard/TableRows/AllArticlesDataRow";

// const ManageArticles = () => {
//   return (
//     <>
//       <Helmet>
//         <title>PrimeScope | All Articles</title>
//       </Helmet>
//       <div className="container mx-auto px-4 sm:px-8">
//         <div className="py-8">
//           <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//             <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//               <table className="min-w-full leading-normal">
//                 <thead>
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                     >
//                       Image
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                     >
//                       Name
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                     >
//                       Category
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                     >
//                       Price
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                     >
//                       Quantity
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                     >
//                       Status
//                     </th>

//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <AllArticlesDataRow />
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ManageArticles;



import React, { useState } from "react";
// import AdminArticlesTable from "./AdminArticlesTable";
import AdminArticlesTable from "../../../components/Dashboard/TableRows/AdminArticlesTable";
import Pagination from "../../../modules/Pagination";
import useArticlesAdmin from "../../../hooks/useArticlesAdmin";
import DeclineArticleModal from "../../../components/Modal/DeclineArticleModal";

const AdminArticles = () => {
  const { articles, total, refetch } = useArticlesAdmin();
  const [currentPage, setCurrentPage] = useState(1);
  const [declineArticleId, setDeclineArticleId] = useState(null);

  const handleOpenDeclineModal = (id) => {
    setDeclineArticleId(id);
  };

  const handleCloseDeclineModal = () => {
    setDeclineArticleId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">All Articles: {articles.length}</h2>
      <AdminArticlesTable
        articles={articles}
        refetch={refetch}
        onOpenDeclineModal={handleOpenDeclineModal}
      />
      <Pagination
        total={total}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {declineArticleId && (
        <DeclineArticleModal
          articleId={declineArticleId}
          onClose={handleCloseDeclineModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AdminArticles;
