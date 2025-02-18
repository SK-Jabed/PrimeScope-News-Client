import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import TrendingArticles from "./TrendingArticles/TrendingArticles";
import AllPublisher from "./AllPublisher";
import StatisticsSection from "./StatisticsSection";
import PlansSection from "./PlansSection";
import ExtraSections from "./ExtraSections";
import TrendingCategories from "./TrendingCategories";
import EditorsPick from "./EditorsPick";

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to show modal after 10 seconds
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 10000);

    // Cleanup timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribeClick = () => {
    setIsModalOpen(false);
    navigate("/subscription");
  };

  return (
    <div className="homepage">
      <Helmet>
        <title>PrimeScope News | Home</title>
      </Helmet>

      <TrendingArticles></TrendingArticles>

      <AllPublisher></AllPublisher>

      <ExtraSections></ExtraSections>

      <TrendingCategories />

      <EditorsPick />

      <StatisticsSection></StatisticsSection>


      <PlansSection></PlansSection>

      

      {/* Headless UI Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40"
      >
        <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
          <Dialog.Title className="text-2xl font-semibold text-center text-blue-600">
            Unlock Premium Features!
          </Dialog.Title>
          <Dialog.Description className="text-gray-600 mt-2 text-center">
            Subscribe now to access exclusive content and features tailored just
            for you!
          </Dialog.Description>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 mr-2"
            >
              Close
            </button>
            <button
              onClick={handleSubscribeClick}
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:opacity-90"
            >
              Subscribe Now
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default Homepage;
