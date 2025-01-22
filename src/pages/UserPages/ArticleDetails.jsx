import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const ArticleDetails = () => {
    const axiosSecure = useAxiosSecure();
  const { id } = useParams(); // Get article ID from URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Fetch article details
        const { data } = await axiosSecure.get(`/articles/${id}`);
        setArticle(data);

        // Increment view count
        await axiosSecure.put(`/articles/${id}/view`);
      } catch (error) {
        Swal.fire("Error", "Failed to load article details.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
     <LoadingSpinner />
    );
  }

  if (!article) {
    return <div className="text-center text-lg">Article not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 lg:px-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
          <div className="flex items-center mt-4">
            <img
              src={article.publisher?.publisherLogo}
              alt={article.publisher?.publisherName}
              className="w-10 h-10 rounded-full"
            />
            <p className="ml-4 text-sm text-gray-500">
              Published by {article.publisher?.publisherName}
            </p>
          </div>
          <div className="mt-6">
            <p className="text-gray-600 text-lg">{article.description}</p>
          </div>
          <div className="mt-4 text-gray-400 text-sm">
            Views: {article.views}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
