import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import moment from "moment";
import { FaRegEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TrendingArticles = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch trending articles using TanStack Query
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["trending-articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trending-articles");
      return res.data;
    },
    staleTime: 60000,
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="trending-banner my-10 text-center text-gray-400">
        <p>Loading trending articles...</p>
      </div>
    );
  }

  // Ensure at least 2 slides for loop mode
  const enableLoop = articles.length > 1;

  return (
    <div className="trending-banner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={enableLoop}
        spaceBetween={30}
        slidesPerView={1}
        className="w-full"
      >
        {articles.map((article) => (
          <SwiperSlide key={article._id}>
            <div
              className="relative h-[450px] md:h-[500px] bg-cover bg-center shadow-md overflow-hidden"
              style={{ backgroundImage: `url(${article.image})` }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90 flex flex-col justify-end p-6 text-white">
                {/* Tags */}
                <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-500 text-white px-3 py-1 text-xs font-semibold rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Status & Premium Badge */}
                <div className="absolute top-5 right-5 flex gap-2">
                  {article.status === "approved" && (
                    <span className="bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded">
                      Approved
                    </span>
                  )}
                  {article.status === "declined" && (
                    <span className="bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded">
                      Declined
                    </span>
                  )}
                  {article.isPremium && (
                    <span className="bg-yellow-500 text-black px-3 py-1 text-xs font-semibold rounded">
                      Premium
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h2 className="text-2xl md:text-3xl font-bold mb-1">
                  {article.title}
                </h2>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {article.description}
                </p>

                {/* Date */}
                <p className="text-gray-400 text-sm mb-3">
                  {moment(article.postedDate).format("MMMM D, YYYY")}
                </p>

                {/* Author & Publisher Info */}
                <div className="flex items-center justify-between">
                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={article.author.photo}
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {article.author.name}
                      </p>
                      <p className="text-xs text-gray-300">
                        {article.author.email}
                      </p>
                    </div>
                  </div>

                  {/* Publisher */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={article.publisher.publisherLogo}
                      alt={article.publisher.publisherName}
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm font-medium">
                      {article.publisher.publisherName}
                    </p>
                  </div>
                </div>

                {/* Views Counter */}
                <div className="flex items-center mt-3 space-x-2 text-gray-300">
                  <FaRegEye className="text-lg" />
                  <span>{article.views} Views</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingArticles;
