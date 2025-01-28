// import React from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useNavigate } from 'react-router-dom';

// const SubscriptionPage = () => {
//     const navigate = useNavigate();
//     const plans = [
//       {
//         id: 1,
//         title: "1 Minute Plan",
//         description: "Quick preview for testing",
//         price: 1,
//       },
//       {
//         id: 2,
//         title: "5-Day Plan",
//         description: "Get full access for 5 days",
//         price: 5,
//       },
//       {
//         id: 3,
//         title: "10-Day Plan",
//         description: "Unlock for a longer duration",
//         price: 10,
//       },
//     ];
// const handleSubscription = (plan) => {
//   navigate("/payment", { state: { plan } });
// };

//     return (
//       <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-10">
//         <Helmet>
//           <title>Subscription | PrimeScope News</title>
//         </Helmet>
//         <h1 className="text-4xl font-bold text-center">
//           Unlock Premium Features
//         </h1>
//         <p className="text-center mt-4 text-lg">
//           Access exclusive articles, stories, and insights with our premium
//           subscription plans.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-4">
//           {plans.map((plan) => (
//             <div
//               key={plan.id}
//               className="bg-white shadow-lg rounded-lg p-6 text-black text-center"
//             >
//               <h2 className="text-xl font-bold">{plan.title}</h2>
//               <p className="mt-4">{plan.description}</p>
//               <p className="text-2xl font-bold mt-4">${plan.price}</p>
//               <button
//                 className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                 onClick={() => handleSubscription(plan)}
//               >
//                 Subscribe Now
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
// };
            

// export default SubscriptionPage;



import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const plans = [
    {
      id: 1,
      title: "1 Minute Plan",
      description: "Quick preview for testing",
      price: 1,
      features: ["1-minute full access", "Exclusive articles"],
      borderColor: "border-blue-500",
    },
    {
      id: 2,
      title: "5-Day Plan",
      description: "Get full access for 5 days",
      price: 5,
      features: [
        "5 days of premium access",
        "Priority support",
        "Exclusive insights",
      ],
      borderColor: "border-green-500",
    },
    {
      id: 3,
      title: "10-Day Plan",
      description: "Unlock for a longer duration",
      price: 10,
      features: [
        "10 days of unlimited access",
        "Priority support",
        "Ad-free experience",
        "Exclusive stories",
      ],
      borderColor: "border-red-500",
    },
  ];

  const handleSubscription = (plan) => {
    navigate("/payment", { state: { plan } });
  };

  return (
    <div className=" text-white min-h-screen">
      <Helmet>
        <title>Subscription | PrimeScope News</title>
      </Helmet>

      {/* Banner Section */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-500 to-indigo-600">
        <h1 className="text-5xl font-bold">Unlock Premium Features</h1>
        <p className="mt-4 text-lg">
          Access exclusive articles, stories, and insights with our premium
          subscription plans.
        </p>
      </div>

      {/* Plans Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:px-20 py-10">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white shadow-xl rounded-lg p-6 border-4 ${plan.borderColor} transform transition duration-300 hover:scale-105`}
          >
            <h2 className="text-2xl font-bold text-gray-800">{plan.title}</h2>
            <p className="mt-2 text-gray-600">{plan.description}</p>
            <p className="text-3xl font-bold text-gray-800 mt-4">
              ${plan.price}
            </p>
            <ul className="mt-4 text-gray-600">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center mt-2">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.854 16.854a.5.5 0 00.707 0l7-7a.5.5 0 00-.707-.708l-6.647 6.646-3.646-3.646a.5.5 0 00-.708.708l4 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
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
