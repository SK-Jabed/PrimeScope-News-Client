import React from "react";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import AddArticleForm from "../../components/Forms/AddArticleForm";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AddArticle = () => {
  const { user } = useAuth();

  const handleArticleSubmit = async (data, resetForm) => {
    try {
      const response = await axiosSecure.post("/articles", {
        ...data,
        author: {
          name: user?.displayName || "Anonymous",
          email: user?.email || "unknown@example.com",
          photo: user?.photoURL || "https://i.ibb.co/placeholder-photo.jpg",
        },
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Article Submitted!",
          text: "Your article will be published after admin approval.",
        });
        resetForm();
      }
    } catch (error) {
      if (error.response?.status === 403) {
        Swal.fire({
          icon: "warning",
          title: "Upgrade to Premium",
          text: error.response.data.message,
          footer: '<a href="/subscription">Subscribe Now</a>',
        });
      } else if (error.response?.status === 404) {
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: error.response?.data?.message || "Something went wrong.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-8 pt-14 px-2 transition duration-300">
      <Helmet>
        <title>Add Article | PrimeScope News</title>
      </Helmet>
      <AddArticleForm onSubmit={handleArticleSubmit} />
    </div>
  );
};

export default AddArticle;
