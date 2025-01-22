// import React from 'react';

// const MyArticles = () => {
//     return (
//         <div>
//             My Articles are here
//         </div>
//     );
// };

// export default MyArticles;





import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";

const MyArticlesPage = () => {
    const {user} = useAuth();
  const [articles, setArticles] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/myArticles?useremail=${user?.email}`
        );
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/articles/${id}`);
        setArticles((prev) => prev.filter((article) => article._id !== id));
        Swal.fire("Deleted!", "Your article has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete article:", error);
        Swal.fire("Error!", "Failed to delete article.", "error");
      }
    }
  };

  const openModal = (article) => {
    setModalData(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Articles</h1>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th>Premium</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={article._id}>
              <td>{index + 1}</td>
              <td>{article.title}</td>
              <td>
                {article.status}
                {article.status === "declined" && (
                  <button
                    className="ml-2 text-sm text-blue-600 underline"
                    onClick={() => openModal(article)}
                  >
                    See Reason
                  </button>
                )}
              </td>
              <td>{article.isPremium ? "Yes" : "No"}</td>
              <td>
                <button className="btn btn-primary mr-2">Update</button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(article._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          className="fixed inset-0 z-10"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto">
              <Dialog.Title className="text-lg font-bold">
                Decline Reason
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-gray-600">
                {modalData.declineReason}
              </Dialog.Description>
              <button className="btn btn-secondary mt-4" onClick={closeModal}>
                Close
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default MyArticlesPage;
