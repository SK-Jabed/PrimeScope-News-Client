import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Marquee from "react-fast-marquee";
import axios from "axios";

const AllPublisher = () => {
  const [publishers, setPublishers] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    // Fetch publishers from the server
    const fetchPublishers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/publishers");
        setPublishers(data);
      } catch (error) {
        console.error("Failed to fetch publishers:", error);
      }
    };

    fetchPublishers();
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-center mb-4">Our Publishers</h2>
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover
        className="bg-gray-100 p-4 rounded-lg shadow-lg"
      >
        {publishers.map((publisher) => (
          <div
            key={publisher._id}
            className="flex flex-col items-center justify-center mx-4"
          >
            <img
              src={publisher.logo}
              alt={publisher.name}
              className="w-24 h-24 object-contain rounded-full shadow-lg"
            />
            <p className="mt-2 text-sm font-medium text-gray-700">
              {publisher.name}
            </p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default AllPublisher;
