// import { Helmet } from "react-helmet-async";
// import Button from "../../components/Shared/Buttons/Button";
// import { useNavigate } from "react-router-dom";

// const ErrorPage = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="bg-white">
//       <Helmet>
//         <title>PrimeScope News | ErrorPage</title>
//       </Helmet>
//       <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
//         <div className="flex flex-col items-center max-w-sm mx-auto text-center">
//           <p className="p-3 text-sm font-medium text-lime-500 rounded-full bg-blue-50 ">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
//               />
//             </svg>
//           </p>
//           <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
//             Something Went Wrong!
//           </h1>
//           <p className="mt-4 text-gray-500 ">Here are some helpful links:</p>

//           <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center justify-center w-1/2 px-5 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto   hover:bg-gray-100 "
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-5 h-5 rtl:rotate-180 text-lime-500"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
//                 />
//               </svg>

//               <span>Go back</span>
//             </button>

//             <Button label={"Take Me Home"} onClick={() => navigate("/")} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ErrorPage;


import React from 'react';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
        <Helmet>
          <title>PrimeScope News | ErrorPage</title>
        </Helmet>
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
          <h1 className="text-9xl font-extrabold text-purple-700 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The page you’re looking for doesn’t exist or was removed. Please
            check the URL or return to the homepage.
          </p>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-lg font-medium text-white bg-purple-700 hover:bg-purple-800 rounded-full px-6 py-3 transition-all duration-300"
          >
            <i class="fa-solid fa-house"></i> Go to Home
          </Link>
        </div>
      </div>
    );
};

export default ErrorPage;