// import React, { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
// import { axiosSecure } from "../../hooks/useAxiosSecure";
// import { useNavigate } from "react-router-dom";
// import Container from "../../components/Shared/Container";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";

// const publishers = [
//   "Jugantor",
//   "Daily Star",
//   "New York Times",
//   "Global Trend",
//   "Tech World",
// ];

// const tags = ["Health", "Science", "Technology"];

// const AllArticlesPage = () => {
  
//   const [articles, setArticles] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedPublisher, setSelectedPublisher] = useState("");
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const limit = 6; // Articles per page

//   const fetchArticles = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axiosSecure.get("/articles", {
//         params: {
//           page: currentPage + 1,
//           limit,
//           search: searchQuery,
//           publisher: selectedPublisher,
//           tags: selectedTags.join(","),
//         },
//       });
//       setArticles(data.articles);
//       setTotalPages(Math.ceil(data.total / limit));
//     } catch (error) {
//       console.error("Error fetching articles:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchArticles();
//   }, [currentPage, searchQuery, selectedPublisher, selectedTags]);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const toggleTag = (tag) => {
//     setSelectedTags((prev) =>
//       prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
//     );
//   };

//   return (
//     <div>
//       <Container>
//         <h1 className="text-3xl font-bold mb-6">All Articles</h1>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6">
//           {/* Search */}
//           <input
//             type="text"
//             placeholder="Search articles..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="border p-2 rounded-lg flex-1"
//           />
//           {/* Publisher Filter */}
//           <select
//             value={selectedPublisher}
//             onChange={(e) => setSelectedPublisher(e.target.value)}
//             className="border p-2 rounded-lg"
//           >
//             <option value="">All Publishers</option>
//             {publishers.map((publisher) => (
//               <option key={publisher} value={publisher}>
//                 {publisher}
//               </option>
//             ))}
//           </select>
//           {/* Tags Filter */}
//           <div className="flex gap-2">
//             {tags.map((tag) => (
//               <button
//                 key={tag}
//                 onClick={() => toggleTag(tag)}
//                 className={`px-4 py-2 border rounded-lg ${
//                   selectedTags.includes(tag)
//                     ? "bg-indigo-500 text-white"
//                     : "bg-gray-100"
//                 }`}
//               >
//                 {tag}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Articles */}
//         {loading ? (
//           <div className="flex justify-center items-center">
//             <LoadingSpinner></LoadingSpinner>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {articles.map((article) => (
//               <div
//                 key={article._id}
//                 className={`p-4 border rounded-lg shadow-md ${
//                   article.isPremium
//                     ? "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white"
//                     : "bg-white"
//                 }`}
//               >
//                 <img
//                   src={article.image}
//                   alt={article.title}
//                   className="w-full h-48 object-cover rounded-lg mb-4"
//                 />
//                 <h3 className="text-xl font-bold">{article.title}</h3>
//                 <p className="text-gray-500 text-sm mb-2">
//                   Publisher: {article.publisher.publisherName}
//                 </p>
//                 <p className="text-sm text-gray-700 mb-4">
//                   {article.description.slice(0, 100)}...
//                 </p>
//                 <button
//                   disabled={article.isPremium}
//                   onClick={() => navigate(`/articleDetails/${article._id}`)}
//                   className={`w-full px-4 py-2 rounded-lg ${
//                     article.isPremium
//                       ? "bg-gray-400 text-gray-700 cursor-not-allowed"
//                       : "bg-indigo-500 text-white hover:bg-indigo-600"
//                   }`}
//                 >
//                   {article.isPremium ? "Subscribe to Access" : "Read More"}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="mt-6">
//           <ReactPaginate
//             previousLabel={"← Previous"}
//             nextLabel={"Next →"}
//             breakLabel={"..."}
//             pageCount={totalPages}
//             marginPagesDisplayed={2}
//             pageRangeDisplayed={5}
//             onPageChange={handlePageClick}
//             containerClassName={"pagination flex justify-center gap-2"}
//             pageClassName={"page-item"}
//             pageLinkClassName={"page-link px-3 py-1 border rounded-lg"}
//             previousClassName={"page-item"}
//             previousLinkClassName={"page-link px-3 py-1 border rounded-lg"}
//             nextClassName={"page-item"}
//             nextLinkClassName={"page-link px-3 py-1 border rounded-lg"}
//             activeClassName={"active bg-indigo-500 text-white"}
//           />
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default AllArticlesPage;




// import React, { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
// import { useNavigate } from "react-router-dom";
// import { gsap } from "gsap";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { axiosSecure } from "../../hooks/useAxiosSecure";
// import usePublishers from "../../hooks/usePublishers";
// import Container from "../../components/Shared/Container";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";

// const tags = ["Health", "Science", "Technology"];

// const AllArticlesPage = () => {
//   const [articles, setArticles] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedPublisher, setSelectedPublisher] = useState("");
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { publishers, isLoading: publishersLoading } = usePublishers();
//   const navigate = useNavigate();
//   const limit = 6;

//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   const fetchArticles = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axiosSecure.get("/articles", {
//         params: {
//           page: currentPage + 1,
//           limit,
//           search: searchQuery,
//           publisher: selectedPublisher,
//           tags: selectedTags.join(","),
//         },
//       });
//       setArticles(data.articles);
//       setTotalPages(Math.ceil(data.total / limit));
//     } catch (error) {
//       console.error("Error fetching articles:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchArticles();
//   }, [currentPage, searchQuery, selectedPublisher, selectedTags]);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const toggleTag = (tag) => {
//     setSelectedTags((prev) =>
//       prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
//     );
//   };

//   const animateCards = (element) => {
//     gsap.fromTo(
//       element,
//       { opacity: 0, y: 50 },
//       { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
//     );
//   };

//   return (
//     <div>
//       {/* Banner */}
//       <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16 mb-8">
//         <Container>
//           <h1 className="text-4xl font-bold" data-aos="fade-up">
//             Explore Articles
//           </h1>
//           <p className="text-lg mt-4" data-aos="fade-up" data-aos-delay="200">
//             Stay updated with the latest news and articles from various domains.
//           </p>
//         </Container>
//       </div>

//       <Container>
//         {/* Filters */}
//         <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//           {/* Search Bar */}
//           <input
//             type="text"
//             placeholder="Search articles..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full md:w-2/3 border p-3 rounded-lg shadow focus:ring-2 focus:ring-indigo-500"
//           />

//           {/* Publisher Filter */}
//           <select
//             value={selectedPublisher}
//             onChange={(e) => setSelectedPublisher(e.target.value)}
//             className="border p-3 rounded-lg shadow focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">All Publishers</option>
//             {!publishersLoading &&
//               publishers?.map((publisher) => (
//                 <option key={publisher._id} value={publisher.name}>
//                   {publisher.name}
//                 </option>
//               ))}
//           </select>

//           {/* Tags */}
//           <div className="flex gap-2">
//             {tags.map((tag) => (
//               <button
//                 key={tag}
//                 onClick={() => toggleTag(tag)}
//                 className={`px-4 py-2 border rounded-lg ${
//                   selectedTags.includes(tag)
//                     ? "bg-indigo-500 text-white"
//                     : "bg-gray-100"
//                 }`}
//               >
//                 {tag}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Articles */}
//         {loading ? (
//           <div className="flex justify-center items-center">
//             <LoadingSpinner />
//           </div>
//         ) : (
//           <div
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//             ref={(el) => animateCards(el)}
//           >
//             {articles.map((article) => (
//               <div
//                 key={article._id}
//                 className={`p-4 border rounded-lg shadow-md ${
//                   article.isPremium
//                     ? "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white"
//                     : "bg-white"
//                 }`}
//                 data-aos="fade-up"
//               >
//                 <img
//                   src={article.image}
//                   alt={article.title}
//                   className="w-full h-48 object-cover rounded-lg mb-4"
//                 />
//                 <h3 className="text-xl font-bold">{article.title}</h3>
//                 <div className="flex gap-2 my-2">
//                   {article.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-2 py-1 text-sm rounded bg-indigo-200 text-indigo-800"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//                 <p className="text-sm text-gray-700 mb-4">
//                   {article.description.slice(0, 100)}...
//                 </p>
//                 <button
//                   disabled={article.isPremium}
//                   onClick={() => navigate(`/articleDetails/${article._id}`)}
//                   className={`w-full px-4 py-2 rounded-lg ${
//                     article.isPremium
//                       ? "bg-gray-400 text-gray-700 cursor-not-allowed"
//                       : "bg-indigo-500 text-white hover:bg-indigo-600"
//                   }`}
//                 >
//                   {article.isPremium ? "Subscribe to Access" : "Read More"}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="mt-6 flex justify-center">
//           <ReactPaginate
//             previousLabel={"← Previous"}
//             nextLabel={"Next →"}
//             pageCount={totalPages}
//             onPageChange={handlePageClick}
//             containerClassName="flex gap-2"
//             pageClassName="page-item"
//             pageLinkClassName="page-link px-3 py-1 border rounded-lg"
//             previousClassName="page-item"
//             previousLinkClassName="page-link px-3 py-1 bg-black text-white rounded-lg"
//             nextClassName="page-item"
//             nextLinkClassName="page-link px-3 py-1 bg-black text-white rounded-lg"
//             activeClassName="bg-indigo-500 text-white"
//           />
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default AllArticlesPage;

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
  const { publishers, isLoading: publishersLoading } = usePublishers();
  const { user } = useAuth(); // Get logged-in user data from auth context
  const { data: userData, isLoading: userLoading } = useUserData(user?.email); // Fetch user's premium status
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
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [searchQuery, selectedPublisher, selectedTags]);

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
    <div>
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
            className="w-full md:w-2/3 border p-3 rounded-lg shadow focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
            className="border p-3 rounded-lg shadow focus:ring-2 focus:ring-indigo-500"
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
                className={`px-4 py-2 border rounded-lg ${
                  selectedTags.includes(tag)
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100"
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
                className={`p-4 border rounded-lg shadow-md ${
                  article.isPremium
                    ? "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white"
                    : "bg-white"
                }`}
                data-aos="fade-up"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold">{article.title}</h3>
                <div className="flex gap-2 my-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm rounded bg-indigo-200 text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  {article.description.slice(0, 100)}...
                </p>
                <button
                  disabled={article.isPremium && !userData?.isPremium}
                  onClick={() => navigate(`/articleDetails/${article._id}`)}
                  className={`w-full px-4 py-2 rounded-lg ${
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

