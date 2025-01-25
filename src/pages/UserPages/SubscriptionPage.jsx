import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage = () => {
    const navigate = useNavigate();
    const plans = [
      {
        id: 1,
        title: "1 Minute Plan",
        description: "Quick preview for testing",
        price: 1,
      },
      {
        id: 2,
        title: "5-Day Plan",
        description: "Get full access for 5 days",
        price: 5,
      },
      {
        id: 3,
        title: "10-Day Plan",
        description: "Unlock for a longer duration",
        price: 10,
      },
    ];
const handleSubscription = (plan) => {
  navigate("/payment", { state: { plan } });
};

    return (
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-10">
        <Helmet>
          <title>Subscription | PrimeScope News</title>
        </Helmet>
        <h1 className="text-4xl font-bold text-center">
          Unlock Premium Features
        </h1>
        <p className="text-center mt-4 text-lg">
          Access exclusive articles, stories, and insights with our premium
          subscription plans.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white shadow-lg rounded-lg p-6 text-black text-center"
            >
              <h2 className="text-xl font-bold">{plan.title}</h2>
              <p className="mt-4">{plan.description}</p>
              <p className="text-2xl font-bold mt-4">${plan.price}</p>
              <button
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handleSubscription(plan)}
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>
    );
};
            

export default SubscriptionPage;