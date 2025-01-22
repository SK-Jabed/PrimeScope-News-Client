import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import UpdateArticleForm from "../../components/Forms/UpdateArticleForm";

const UpdateArticle = () => {
  const { id } = useParams(); // Get article ID from URL params
  const [article, setArticle] = useState(null);

  // Fetch article data by ID
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
      const response = await axiosSecure.put(`/articles/${id}`, updatedData);
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Article Updated!",
          text: "Your article has been successfully updated.",
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
    return <div>Loading...</div>; // Show loading while fetching data
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Helmet>
        <title>Update Article | PrimeScope News</title>
      </Helmet>
      <UpdateArticleForm onSubmit={handleArticleUpdate} defaultValues={article} />
    </div>
  );
};

export default UpdateArticle;
