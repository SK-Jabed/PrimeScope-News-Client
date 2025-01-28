// import React, { useState } from "react";
// import AdminArticlesTable from "../../../components/Dashboard/TableRows/AdminArticlesTable";
// import useArticlesAdmin from "../../../hooks/useArticlesAdmin";
// import DeclineArticleModal from "../../../components/Modal/DeclineArticleModal";

// const AdminArticles = () => {
//   const [declineArticleId, setDeclineArticleId] = useState(null);
//   const { articles, refetch } = useArticlesAdmin();

//   const handleOpenDeclineModal = (id) => {
//     setDeclineArticleId(id);
//   };

//   const handleCloseDeclineModal = () => {
//     setDeclineArticleId(null);
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-3xl font-bold mb-6">All Articles</h2>
//       <AdminArticlesTable
//         articles={articles}
//         refetch={refetch}
//         onOpenDeclineModal={handleOpenDeclineModal}
//       />
//       {declineArticleId && (
//         <DeclineArticleModal
//           articleId={declineArticleId}
//           onClose={handleCloseDeclineModal}
//           refetch={refetch}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminArticles;




import React, { useState } from "react";
import AdminArticlesTable from "../../../components/Dashboard/TableRows/AdminArticlesTable";
import useArticlesAdmin from "../../../hooks/useArticlesAdmin";
import DeclineArticleModal from "../../../components/Modal/DeclineArticleModal";
import Pagination from "../../../modules/Pagination";

const AdminArticles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [declineArticleId, setDeclineArticleId] = useState(null);
  const { articles, refetch } = useArticlesAdmin();

  const handleOpenDeclineModal = (id) => {
    setDeclineArticleId(id);
  };

  const handleCloseDeclineModal = () => {
    setDeclineArticleId(null);
  };

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {/* Gradient Header */}
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 mb-2">
        Admin Articles Management
      </h2>
      <p className="text-gray-600 mb-6">
        Manage all user-submitted articles. Approve, decline, delete, or mark as
        premium.
      </p>

      <AdminArticlesTable
        articles={paginatedArticles}
        refetch={refetch}
        onOpenDeclineModal={handleOpenDeclineModal}
      />

      {declineArticleId && (
        <DeclineArticleModal
          articleId={declineArticleId}
          onClose={handleCloseDeclineModal}
          refetch={refetch}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default AdminArticles;
