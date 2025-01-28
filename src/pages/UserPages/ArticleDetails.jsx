// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";

// const ArticleDetails = () => {
//   const axiosSecure = useAxiosSecure();
//   const { id } = useParams(); // Get article ID from URL
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         // Fetch article details
//         const { data } = await axiosSecure.get(`/articles/${id}`);
//         setArticle(data);

//         // Increment view count
//         await axiosSecure.put(`/articles/${id}/view`);
//       } catch (error) {
//         Swal.fire("Error", "Failed to load article details.", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticle();
//   }, [id]);

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (!article) {
//     return <div className="text-center text-lg">Article not found</div>;
//   }

//   return (
//     <div className="container mx-auto py-8 px-4 lg:px-12">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         <img
//           src={article.image}
//           alt={article.title}
//           className="w-full h-64 object-cover"
//         />
//         <div className="p-6">
//           <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
//           <div className="flex items-center mt-4">
//             <img
//               src={article.publisher?.publisherLogo}
//               alt={article.publisher?.publisherName}
//               className="w-10 h-10 rounded-full"
//             />
//             <p className="ml-4 text-sm text-gray-500">
//               Published by {article.publisher?.publisherName}
//             </p>
//           </div>
//           <div className="mt-6">
//             <p className="text-gray-600 text-lg">{article.description}</p>
//           </div>
//           <div className="mt-4 text-gray-400 text-sm">
//             Views: {article.views}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArticleDetails;







import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const ArticleDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
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
    return <LoadingSpinner />;
  }

  if (!article) {
    return <div className="text-center text-lg">Article not found</div>;
  }

  const formattedDate = moment(article.postedDate).format("MMMM D, YYYY");

  return (
    <div className="container mx-auto py-10 px-4 lg:px-12">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 p-6 border-b">
          {article.title}
        </h1>

        {/* Image */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full max-h-96 object-cover"
        />

        {/* Article Details */}
        <div className="p-6">
          {/* Publisher Details */}
          <div className="flex items-center mb-4">
            <img
              src={article.publisher?.publisherLogo}
              alt={article.publisher?.publisherName}
              className="w-12 h-12 rounded-full"
            />
            <p className="ml-4 text-gray-600">
              Published by{" "}
              <span className="font-semibold">
                {article.publisher?.publisherName}
              </span>
            </p>
          </div>

          {/* Author Details */}
          <div className="flex items-center mb-4">
            <img
              src={article.author?.photo}
              alt={article.author?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-4">
              <p className="text-gray-600">
                Author:{" "}
                <span className="font-semibold">{article.author?.name}</span>
              </p>
              <p className="text-sm text-gray-500">{article.author?.email}</p>
            </div>
          </div>

          {/* Article Description */}
          <div className="mb-6">
            <p className="text-gray-700 text-lg">{article.description}</p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Tags:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <p className="text-gray-600">
              Posted on:{" "}
              <span className="font-medium text-gray-800">{formattedDate}</span>
            </p>
            <p className="text-gray-600">
              Views:{" "}
              <span className="font-medium text-gray-800">{article.views}</span>
            </p>
            <p className="text-gray-600">
              Premium Article:{" "}
              <span
                className={`font-medium ${
                  article.isPremium ? "text-green-600" : "text-gray-600"
                }`}
              >
                {article.isPremium ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
