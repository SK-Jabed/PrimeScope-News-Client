import React from "react";
import { useNavigate } from "react-router-dom";

const PlansSection = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 1,
      title: "1-Minute Plan",
      description: "Quick preview for testing",
      price: 1,
      features: ["Test Features", "Quick Preview", "Basic Access"],
      bgColor: "bg-blue-500",
    },
    {
      id: 2,
      title: "5-Day Plan",
      description: "Get full access for 5 days",
      price: 5,
      features: ["Full Articles", "Priority Support", "Weekly Insights"],
      bgColor: "bg-green-500",
    },
    {
      id: 3,
      title: "10-Day Plan",
      description: "Unlock for a longer duration",
      price: 10,
      features: ["Exclusive Content", "Extended Access", "Premium Support"],
      bgColor: "bg-purple-500",
    },
  ];

  const handleSubscription = (plan) => {
    navigate("/payment", { state: { plan } });
  };

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-500 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center">Choose Your Plan</h2>
        <p className="text-lg text-center mt-4">
          Select a subscription plan that suits your needs and unlock premium
          features.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`${plan.bgColor} p-6 rounded-lg shadow-lg text-center hover:scale-105 transform transition duration-300`}
            >
              <h3 className="text-2xl font-bold">{plan.title}</h3>
              <p className="mt-4">{plan.description}</p>
              <p className="text-4xl font-bold mt-4">${plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center justify-center">
                    <span className="bg-white text-black px-3 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className="mt-6 bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-100"
                onClick={() => handleSubscription(plan)}
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
