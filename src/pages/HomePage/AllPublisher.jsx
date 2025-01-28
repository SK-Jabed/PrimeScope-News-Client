import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllPublisher = () => {
  const axiosPublic = useAxiosPublic();
  const marqueeRef = useRef(null);

  // Fetch publishers data using TanStack Query
  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/publishers");
      return data;
    },
  });

  // Initialize AOS for scroll animations
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Apply GSAP animation to marquee
  useEffect(() => {
    if (marqueeRef.current) {
      gsap.fromTo(
        marqueeRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
    }
  }, [publishers]);

  return (
    <div className="my-16 px-6">
      {/* Section Title */}
      <div className="text-center mb-8" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 text-transparent bg-clip-text">
          Our Trusted Publishers
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-lg">
          Explore the leading publishers who contribute valuable content to our
          platform.
        </p>
      </div>

      {/* Marquee Section */}
      <div ref={marqueeRef} data-aos="fade-up">
        <Marquee
          gradient={false}
          speed={60}
          pauseOnHover
          className="bg-gray-100 p-5 rounded-lg shadow-xl border border-gray-200"
        >
          {publishers.map((publisher) => (
            <div
              key={publisher._id}
              className="flex flex-col items-center justify-center mx-6 transform transition duration-300 hover:scale-105"
            >
              <img
                src={publisher.logo}
                alt={publisher.name}
                className="w-24 h-24 object-contain rounded-full shadow-lg border-4 border-white"
              />
              <p className="mt-3 text-sm font-semibold text-gray-700">
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
