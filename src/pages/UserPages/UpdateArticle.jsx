import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import UpdateArticleForm from "../../components/Forms/UpdateArticleForm";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const UpdateArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axiosSecure.get(`/articles/${id}`);
        setArticle(data);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      }
    };
    fetchArticle();
  }, [id]);

  const handleArticleUpdate = async (updatedData) => {
    try {
      const { _id, ...dataToUpdate } = updatedData;

      const response = await axiosSecure.patch(
        `/articles/${_id}`,
        dataToUpdate
      );

      if (response.data.matchedCount > 0 && response.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Article Updated!",
          text: "Your article has been successfully updated.",
        });
        navigate("/myArticles");
      } else if (response.data.matchedCount > 0) {
        Swal.fire({
          icon: "info",
          title: "No Changes Made",
          text: "The data you sent is identical to the existing data.",
        });
        navigate("/myArticles");
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "No matching article was found to update.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    }
  };

  if (!article) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-2">
      <Helmet>
        <title>Update Article | PrimeScope News</title>
      </Helmet>

      <UpdateArticleForm
        onSubmit={handleArticleUpdate}
        defaultValues={article}
      />
    </div>
  );
};

export default UpdateArticle;
