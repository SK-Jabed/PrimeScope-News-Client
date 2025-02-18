


import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";


const PremiumArticles = () => {
  const [premiumArticles, setPremiumArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure(); // Your existing axiosSecure instance
  const navigate = useNavigate();

  // Fetch premium articles from the server
  const fetchPremiumArticles = async () => {
    setLoading(true);
    try {
      const { data } = await axiosSecure.get("/premium-articles");
      setPremiumArticles(data);
    } catch (error) {
      console.error("Error fetching premium articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPremiumArticles();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Premium Articles</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <p>Loading premium articles...</p>
        </div>
      ) : premiumArticles.length === 0 ? (
        <div className="flex justify-center items-center">
          <p>No premium articles available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumArticles.map((article) => (
            <div
              key={article._id}
              className="p-4 border rounded-lg shadow-md bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold">{article.title}</h3>
              <p className="text-sm mb-2">
                Publisher: {article.publisher.publisherName}
              </p>
              <p className="text-sm mb-4">
                {article.description.slice(0, 100)}...
              </p>
              <button
                onClick={() => navigate(`/articleDetails/${article._id}`)}
                className="w-full px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PremiumArticles;
