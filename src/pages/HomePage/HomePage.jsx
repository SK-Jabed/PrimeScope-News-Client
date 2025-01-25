import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@heroui/react";

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for showing modal
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Set a timer to show modal after 10 seconds
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 10000);

    // Cleanup timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribeClick = () => {
    setIsModalOpen(false); // Close the modal
    navigate("/subscription"); // Navigate to the subscription page
  };

  return (
    <div className="homepage">
      <Helmet>
        <title>PrimeScope News | Home</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mt-10">
        Welcome to the Homepage
      </h1>
      <p className="text-gray-600 text-center mt-2">
        Enjoy browsing our content!
      </p>

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


