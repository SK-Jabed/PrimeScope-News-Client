import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

const PlansSection = () => {
  const navigate = useNavigate();
  const cardsRef = useRef(null);

  const plans = [
    {
      id: 1,
      title: "1-Minute Plan",
      description: "Quick preview for testing",
      price: 1,
      features: ["Test Features", "Quick Preview", "Basic Access"],
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      id: 2,
      title: "5-Day Plan",
      description: "Get full access for 5 days",
      price: 5,
      features: ["Full Articles", "Priority Support", "Weekly Insights"],
      gradient: "from-green-400 to-teal-500",
    },
    {
      id: 3,
      title: "10-Day Plan",
      description: "Unlock for a longer duration",
      price: 10,
      features: ["Exclusive Content", "Extended Access", "Premium Support"],
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const handleSubscription = (plan) => {
    navigate("/payment", { state: { plan } });
  };

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // GSAP Animation
  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
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
  }, []);

  return (
    <section className="py-16 px-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Section Header */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
          Choose Your Plan
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
          Select a subscription plan that suits your needs and unlock premium
          features.
        </p>
      </div>

      {/* Plans Grid */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-300 dark:border-gray-600 p-8 transform transition duration-300 hover:scale-105"
            data-aos="zoom-in"
          >
            {/* Gradient Background Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-20`}
            />

            {/* Content */}
            <div className="relative text-center">
              <h3 className="text-2xl font-bold">{plan.title}</h3>
              <p className="mt-4">{plan.description}</p>
              <p className="text-5xl font-extrabold mt-4">${plan.price}</p>

              {/* Features List */}
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center justify-center">
                    <span className="bg-gray-900 dark:bg-gray-600 text-white px-3 py-1 rounded-full text-sm shadow-md">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Subscribe Button */}
              <button
                className="mt-6 bg-gray-900 dark:bg-gray-700 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-800 dark:hover:bg-gray-600 transition duration-300"
                onClick={() => handleSubscription(plan)}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlansSection;
