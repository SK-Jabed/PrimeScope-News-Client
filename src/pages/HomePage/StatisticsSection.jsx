import React, { useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CountUp from "react-countup";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

const StatisticsSection = () => {
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    normalUsers: 0,
    premiumUsers: 0,
  });

  const axiosPublic = useAxiosPublic();
  const statsRef = useRef(null);

  // Fetch user statistics
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axiosPublic.get("/users");
        const totalUsers = data.length;
        const normalUsers = data.filter((user) => !user.isPremium).length;
        const premiumUsers = data.filter((user) => user.isPremium).length;

        setStatistics({ totalUsers, normalUsers, premiumUsers });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // GSAP Animation
  useEffect(() => {
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
        }
      );
    }
  }, [statistics]);

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Section Header */}
      <div className="text-center mb-10 px-6" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-teal-500 text-transparent bg-clip-text">
          User Statistics Overview
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
          Get insights into our platform's growing community with real-time user
          statistics.
        </p>
      </div>

      {/* Statistics Cards */}
      <div
        ref={statsRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 mx-auto"
      >
        {[
          { label: "Total Users", value: statistics.totalUsers, color: "text-teal-500" },
          { label: "Normal Users", value: statistics.normalUsers, color: "text-blue-500" },
          { label: "Premium Users", value: statistics.premiumUsers, color: "text-sky-500" },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-8 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 transform transition duration-300 hover:scale-105"
            data-aos="fade-up"
          >
            <h3 className="text-xl font-semibold text-violet-500">{stat.label}</h3>
            <p className={`text-5xl font-extrabold mt-4 ${stat.color}`}>
              <CountUp end={stat.value} duration={5} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;
