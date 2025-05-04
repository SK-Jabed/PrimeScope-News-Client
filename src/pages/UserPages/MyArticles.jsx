import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyArticlesPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/myArticles?email=${user?.email}`
        );
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    fetchArticles();
  }, [user, axiosSecure]);

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

  const getBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPremiumBadgeClass = (isPremium) => {
    return isPremium
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Articles</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Premium
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article, index) => (
              <tr key={article._id}>
                <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {article.title}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeClass(
                      article.status
                    )}`}
                  >
                    {article.status}
                  </span>
                  {article.status === "declined" && (
                    <button
                      className="ml-2 text-sm text-blue-600 underline"
                      onClick={() => openModal(article)}
                    >
                      See Reason
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPremiumBadgeClass(
                      article.isPremium
                    )}`}
                  >
                    {article.isPremium ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => navigate(`/articleDetails/${article._id}`)}
                  >
                    Details
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    onClick={() => navigate(`/updateArticle/${article._id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(article._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          className="relative z-50"
        >
          {/* Overlay */}
          <div className="fixed inset-0 bg-opacity-60 backdrop-blur-md" />

          {/* Modal Panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="relative w-full max-w-md bg-white rounded-xl shadow-lg">
              <div className="p-6">
                {/* Title */}
                <Dialog.Title className="text-xl font-semibold text-gray-800">
                  Decline Reason
                </Dialog.Title>

                {/* Description */}
                <Dialog.Description className="mt-4 text-sm text-gray-600">
                  {modalData?.declineReason}
                </Dialog.Description>

                {/* Actions */}
                <div className="mt-6 flex justify-end">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-all"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Close Icon */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default MyArticlesPage;
