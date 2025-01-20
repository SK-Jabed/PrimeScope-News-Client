import React from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import AddArticleForm from "../../components/Forms/AddArticleForm";
import useAuth from "../../hooks/useAuth";

const AddArticle = () => {
  const { user } = useAuth();

  const handleArticleSubmit = async (data) => {
    try {
      const response = await axiosSecure.post("/articles", {
        ...data,
        authorName: user?.displayName,
        authorEmail: user?.email,
        authorPhoto: user?.photoURL,
        status: "pending", // Default status for admin approval
        postedDate: new Date().toISOString(),
      });

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Article Submitted!",
          text: "Your article will be published after admin approval.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Helmet>
        <title>Add Article | PrimeScope News</title>
      </Helmet>
      <AddArticleForm onSubmit={handleArticleSubmit} />
    </div>
  );
};

export default AddArticle;
