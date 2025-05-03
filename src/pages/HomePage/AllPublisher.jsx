import React from "react";
import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllPublisher = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch publishers data using TanStack Query
  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/publishers");
      return data;
    },
  });

  return (
    <div className="py-16 px-6 bg-white dark:bg-gray-900 transition-all duration-300">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 text-transparent bg-clip-text">
          Our Trusted Publishers
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-3xl mx-auto text-lg">
          Meet our top-tier publishers who deliver high-quality content to our
          platform.
        </p>
      </div>

      {/* Full-Width Publishers Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-12 shadow-xl">
        <Marquee gradient={false} speed={50} pauseOnHover>
          {publishers.map((publisher) => (
            <div
              key={publisher._id}
              className="flex flex-col items-center justify-center mx-10"
            >
              <div className="w-28 h-28 rounded-full bg-white shadow-lg border-4 border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                <img
                  src={publisher.logo}
                  alt={publisher.name}
                  className="w-24 h-24 object-contain rounded-full"
                />
              </div>
              <p className="mt-3 text-lg font-semibold text-gray-900 dark:text-gray-200 tracking-wide">
                {publisher.name}
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default AllPublisher;
