// import React, { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
// import { Input, Select, Button, Spinner } from "@heroui/react";
// import { axiosSecure } from "../../hooks/useAxiosSecure";

// const AllArticles = () => {
//   const [articles, setArticles] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [publisherFilter, setPublisherFilter] = useState("");
//   const [tagsFilter, setTagsFilter] = useState("");
//   const [loading, setLoading] = useState(false);

//   const limit = 6; // Articles per page

//   const fetchArticles = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axiosSecure.get("/articles", {
//         params: {
//           page: currentPage + 1,
//           limit,
//           search: searchQuery,
//           publisher: publisherFilter,
//           tags: tagsFilter,
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
//   }, [currentPage, searchQuery, publisherFilter, tagsFilter]);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchArticles();
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">All Articles</h2>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 mb-6">
//         <Input
//           label="Search by Title"
//           placeholder="Search articles..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           fullWidth
//         />
//         <Select
//           label="Filter by Publisher"
//           placeholder="Select Publisher"
//           options={[
//             { value: "", label: "All" },
//             { value: "Publisher1", label: "Publisher1" },
//             { value: "Publisher2", label: "Publisher2" },
//           ]}
//           value={publisherFilter}
//           onChange={(value) => setPublisherFilter(value)}
//         />
//         <Input
//           label="Filter by Tags"
//           placeholder="Comma-separated tags"
//           value={tagsFilter}
//           onChange={(e) => setTagsFilter(e.target.value)}
//         />
//         <Button onClick={handleSearch} color="primary">
//           Apply Filters
//         </Button>
//       </div>

//       {/* Articles */}
//       {loading ? (
//         <div className="flex justify-center items-center">
//           <Spinner size="lg" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {articles.map((article) => (
//             <div
//               key={article._id}
//               className={`p-4 border rounded-lg shadow-md ${
//                 article.isPremium
//                   ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
//                   : "bg-white"
//               }`}
//             >
//               <img
//                 src={article.image}
//                 alt={article.title}
//                 className="w-full h-48 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-xl font-bold">{article.title}</h3>
//               <p className="text-gray-500 text-sm mb-2">
//                 Publisher: {article.publisher}
//               </p>
//               <p className="mb-4">{article.description}</p>
//               <Button
//                 onPress={() => {
//                   if (!article.isPremium) {
//                     window.location.href = `/article/${article._id}`;
//                   }
//                 }}
//                 disabled={article.isPremium}
//                 className={`w-full ${
//                   article.isPremium
//                     ? "bg-gray-400 text-gray-700 cursor-not-allowed"
//                     : "bg-indigo-500 text-white"
//                 }`}
//               >
//                 {article.isPremium
//                   ? "Premium - Subscribe to Access"
//                   : "Details"}
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="mt-6">
//         <ReactPaginate
//           previousLabel={"← Previous"}
//           nextLabel={"Next →"}
//           breakLabel={"..."}
//           pageCount={totalPages}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageClick}
//           containerClassName={"pagination flex justify-center"}
//           pageClassName={"page-item"}
//           pageLinkClassName={"page-link"}
//           previousClassName={"page-item"}
//           previousLinkClassName={"page-link"}
//           nextClassName={"page-item"}
//           nextLinkClassName={"page-link"}
//           activeClassName={"active"}
//         />
//       </div>
//     </div>
//   );
// };

// export default AllArticles;





import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const publishers = [
  "Jugantor",
  "Daily Star",
  "New York Times",
  "Global Trend",
  "Tech World",
];

const tags = ["Health", "Science", "Technology"];

const AllArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const limit = 6; // Articles per page

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data } = await axiosSecure.get("/articles", {
        params: {
          page: currentPage + 1,
          limit,
          search: searchQuery,
          publisher: selectedPublisher,
          tags: selectedTags.join(","),
        },
      });
      setArticles(data.articles);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPage, searchQuery, selectedPublisher, selectedTags]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Articles</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg flex-1"
        />
        {/* Publisher Filter */}
        <select
          value={selectedPublisher}
          onChange={(e) => setSelectedPublisher(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">All Publishers</option>
          {publishers.map((publisher) => (
            <option key={publisher} value={publisher}>
              {publisher}
            </option>
          ))}
        </select>
        {/* Tags Filter */}
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
        <div className="flex justify-center items-center">
          <p>Loading articles...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article._id}
              className={`p-4 border rounded-lg shadow-md ${
                article.isPremium
                  ? "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white"
                  : "bg-white"
              }`}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold">{article.title}</h3>
              <p className="text-gray-500 text-sm mb-2">
                Publisher: {article.publisher.publisherName}
              </p>
              <p className="text-sm text-gray-700 mb-4">
                {article.description.slice(0, 100)}...
              </p>
              <button
                disabled={article.isPremium}
                onClick={() =>
                  (window.location.href = `/article/${article._id}`)
                }
                className={`w-full px-4 py-2 rounded-lg ${
                  article.isPremium
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                }`}
              >
                {article.isPremium ? "Subscribe to Access" : "Read More"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex justify-center gap-2"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link px-3 py-1 border rounded-lg"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link px-3 py-1 border rounded-lg"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link px-3 py-1 border rounded-lg"}
          activeClassName={"active bg-indigo-500 text-white"}
        />
      </div>
    </div>
  );
};

export default AllArticlesPage;
