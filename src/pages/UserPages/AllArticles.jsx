import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import usePublishers from "../../hooks/usePublishers";
import useUserData from "../../hooks/useUserData";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const tags = ["Health", "Science", "Technology"];

const AllArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest"); // Default sorting order

  const { publishers, isLoading: publishersLoading } = usePublishers();
  const { user } = useAuth();
  const { data: userData, isLoading: userLoading } = useUserData(user?.email);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data } = await axiosSecure.get("/articles", {
        params: {
          search: searchQuery,
          publisher: selectedPublisher,
          tags: selectedTags.join(","),
        },
      });

      let sortedArticles = [...data.articles];

      if (sortOrder === "newest") {
        sortedArticles.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      } else {
        sortedArticles.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
      }

      setArticles(sortedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [searchQuery, selectedPublisher, selectedTags, sortOrder]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const animateCards = (element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  };

  if (userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16 mb-8">
        <Container>
          <h1 className="text-4xl font-bold" data-aos="fade-up">
            Explore Articles
          </h1>
          <p className="text-lg mt-4" data-aos="fade-up" data-aos-delay="200">
            Stay updated with the latest news and articles from various domains.
          </p>
        </Container>
      </div>

      <Container>
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-2/3 border p-3 rounded-lg shadow focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-3 rounded-lg shadow focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <select
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
            className="border p-3 rounded-lg shadow focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Publishers</option>
            {!publishersLoading &&
              publishers?.map((publisher) => (
                <option key={publisher._id} value={publisher.name}>
                  {publisher.name}
                </option>
              ))}
          </select>

          <div className="flex gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 border rounded-lg transition ${
                  selectedTags.includes(tag)
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            ref={(el) => animateCards(el)}
          >
            {articles.map((article) => (
              <div
                key={article._id}
                className={`p-4 border rounded-lg shadow-md transition ${
                  article.isPremium
                    ? "border-yellow-500 bg-yellow-50 dark:bg-gray-800 dark:border-yellow-500"
                    : "border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                }`}
                data-aos="fade-up"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold">{article.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {article.description.slice(0, 100)}...
                </p>

                <button
                  disabled={article.isPremium && !userData?.isPremium}
                  onClick={() => navigate(`/articleDetails/${article._id}`)}
                  className={`w-full px-4 py-2 rounded-lg transition ${
                    article.isPremium && !userData?.isPremium
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-indigo-500 text-white hover:bg-indigo-600"
                  }`}
                >
                  {article.isPremium && !userData?.isPremium
                    ? "Subscribe to Access"
                    : "Read More"}
                </button>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllArticlesPage;
