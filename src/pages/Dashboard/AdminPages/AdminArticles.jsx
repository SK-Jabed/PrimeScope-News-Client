import React, { useState } from "react";
import AdminArticlesTable from "../../../components/Dashboard/TableRows/AdminArticlesTable";
// import Pagination from "../../../modules/Pagination";
import useArticlesAdmin from "../../../hooks/useArticlesAdmin";
import DeclineArticleModal from "../../../components/Modal/DeclineArticleModal";

const AdminArticles = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [declineArticleId, setDeclineArticleId] = useState(null);
  // const limit = 6; // Number of articles per page
  const { articles, refetch } = useArticlesAdmin();

  const handleOpenDeclineModal = (id) => {
    setDeclineArticleId(id);
  };

  const handleCloseDeclineModal = () => {
    setDeclineArticleId(null);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6">All Articles</h2>
      <AdminArticlesTable
        articles={articles}
        refetch={refetch}
        onOpenDeclineModal={handleOpenDeclineModal}
      />
      {/* <Pagination
        total={total}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        limit={limit}
      /> */}
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



// import React, { useState } from "react";
// import AdminArticlesTable from "../../../components/Dashboard/TableRows/AdminArticlesTable";
// import Pagination from "../../../modules/Pagination";
// import useArticlesAdmin from "../../../hooks/useArticlesAdmin";
// import DeclineArticleModal from "../../../components/Modal/DeclineArticleModal";

// const AdminArticles = () => {
//   const { articles, total, refetch } = useArticlesAdmin();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [declineArticleId, setDeclineArticleId] = useState(null);

//   const handleOpenDeclineModal = (id) => {
//     setDeclineArticleId(id);
//   };

//   const handleCloseDeclineModal = () => {
//     setDeclineArticleId(null);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4">All Articles: {articles.length}</h2>
//       <AdminArticlesTable
//         articles={articles}
//         refetch={refetch}
//         onOpenDeclineModal={handleOpenDeclineModal}
//       />
//       <Pagination
//         total={total}
//         currentPage={currentPage}
//         onPageChange={setCurrentPage}
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
