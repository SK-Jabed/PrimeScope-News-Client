import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TrendingArticles = () => {
  const [articles, setArticles] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Fetch top 6 trending articles
    axiosSecure
      .get("/trending-articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Failed to fetch articles:", err));
  }, [axiosSecure]);

  return (
    <div className="trending-banner my-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
      >
        {articles.map((article) => (
          <SwiperSlide key={article._id}>
            <div
              className="relative h-96 bg-cover bg-center rounded-lg shadow-md"
              style={{ backgroundImage: `url(${article.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-6 text-white rounded-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  {article.title}
                </h2>
                <p className="text-sm md:text-base line-clamp-3">
                  {article.description}
                </p>
                <div className="flex items-center mt-3">
                  <img
                    src={article.author.photo}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {article.author.name}
                    </p>
                    <p className="text-xs">
                      {new Date(article.postedDate).toLocaleDateString()}
                    </p>
                  </div>
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
