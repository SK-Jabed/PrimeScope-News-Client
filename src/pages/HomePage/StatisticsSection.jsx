import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CountUp from "react-countup";

const StatisticsSection = () => {
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    normalUsers: 0,
    premiumUsers: 0,
  });
const axiosPublic = useAxiosPublic();
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

  return (
    <section className="my-16 bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Our Users Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Users */}
          <div className="p-6 bg-white text-indigo-600 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-4xl font-bold mt-4">
              <CountUp end={statistics.totalUsers} duration={10} />
            </p>
          </div>
          {/* Normal Users */}
          <div className="p-6 bg-white text-indigo-600 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Normal Users</h3>
            <p className="text-4xl font-bold mt-4">
              <CountUp end={statistics.normalUsers} duration={10} />
            </p>
          </div>
          {/* Premium Users */}
          <div className="p-6 bg-white text-indigo-600 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Premium Users</h3>
            <p className="text-4xl font-bold mt-4">
              <CountUp end={statistics.premiumUsers} duration={10} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
