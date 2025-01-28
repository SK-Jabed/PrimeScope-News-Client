// import React from 'react';
// import Container from '../Container';
// import { AiOutlineMenu } from "react-icons/ai";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";
// import avatarImg from "../../../assets/placeholder.jpg";
// import logo from "../../../assets/logo/logo-flat.png";

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="h-[73px]">
//       <div className="fixed w-full bg-white z-10 shadow-sm">
//         <div className="py-4 border-b-[1px]">
//           <Container>
//             <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
//               {/* Logo */}
//               <Link to="/">
//                 <img src={logo} alt="logo" width="100" height="100" />
//               </Link>
// {/* Dropdown Menu */}
// <div className="relative">
//   <div className="flex flex-row items-center gap-3">
//     {/* Dropdown btn */}
//     <div
//       onClick={() => setIsOpen(!isOpen)}
//       className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
//     >
//       <AiOutlineMenu />
//       <div className="hidden md:block">
//         {/* Avatar */}
//         <img
//           className="rounded-full"
//           referrerPolicy="no-referrer"
//           src={user && user.photoURL ? user.photoURL : avatarImg}
//           alt="profile"
//           height="30"
//           width="30"
//         />
//       </div>
//     </div>
//   </div>
//   {isOpen && (
//     <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
//       <div className="flex flex-col cursor-pointer">
//         <Link
//           to="/"
//           className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
//         >
//           Home
//         </Link>

//         {user ? (
//           <>
//             <Link
//               to="/dashboard"
//               className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
//             >
//               Dashboard
//             </Link>
//             <div
//               onClick={logOut}
//               className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
//             >
//               Logout
//             </div>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/authentication/login"
//               className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
//             >
//               Login
//             </Link>
//             <Link
//               to="/authentication/register"
//               className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   )}
// </div>
//             </div>
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import moment from "moment";
import { AiOutlineMenu } from "react-icons/ai";
import Marquee from "react-fast-marquee";
import avatarImg from "../../../assets/placeholder.jpg";
import useAuth from "../../../hooks/useAuth"; // Custom hook for user authentication
import useUserData from "../../../hooks/useUserData";
import LoadingSpinner from "../LoadingSpinner";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const { data: userData, isLoading: userLoading } = useUserData(user?.email); // Fetch user's premium status
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  console.log(userData);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const isAdmin = userData?.role === "admin";

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      {/* Top Section: Date and Subscribe */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
        <span className="text-sm text-gray-600">
          {moment().format("dddd, MMMM D, YYYY")}
        </span>
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-indigo-600">
            PrimeScope News
          </h1>
          <p className="text-sm text-gray-500">Your gateway to breaking news</p>
        </div>
        <button
          onClick={() => navigate("/subscription")}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700"
        >
          Subscribe
        </button>
      </div>

      {/* Logo and Description */}

      {/* Navbar Section */}
      <nav className="border-t border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Hamburger Menu */}
          <button className="text-2xl text-gray-600" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Centered Navigation Links */}
          <ul className="hidden lg:flex gap-6 font-medium">
            <li>
              <Link to="/" className="hover:text-indigo-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/addArticle" className="hover:text-indigo-600">
                Add Articles
              </Link>
            </li>
            <li>
              <Link to="/articles" className="hover:text-indigo-600">
                All Articles
              </Link>
            </li>
            <li>
              <Link to="/subscription" className="hover:text-indigo-600">
                Subscription
              </Link>
            </li>

            {isAdmin && (
              <li>
                <Link
                  to="/dashboard"
                  className="block text-lg font-medium hover:text-indigo-600"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {userData?.isPremium && (
              <li>
                <Link
                  to="/premiumArticles"
                  className="block text-lg font-medium hover:text-indigo-600"
                >
                  Premium Articles
                </Link>
              </li>
            )}
          </ul>

          {/* Right Section */}

          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/authentication/login")}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/authentication/register")}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Register
                </button>
              </>
            ) : (
              <div className="relative">
                <img
                  src={userData?.image || "/default-avatar.png"}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleMenu}
                />
                {menuOpen && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/myArticles"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Articles
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logOut}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Animated Sidebar Menu for Small Screens */}
        {menuOpen && (
          <ul className="lg:hidden bg-gray-50 border-t border-b border-gray-200 p-4 space-y-2">
            <li>
              <Link
                to="/"
                className="block text-lg font-medium hover:text-indigo-600"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/addArticles"
                className="block text-lg font-medium hover:text-indigo-600"
              >
                Add Articles
              </Link>
            </li>
            <li>
              <Link
                to="/articles"
                className="block text-lg font-medium hover:text-indigo-600"
              >
                All Articles
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link
                  to="/dashboard"
                  className="block text-lg font-medium hover:text-indigo-600"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {userData?.isPremium && (
              <li>
                <Link
                  to="/premiumArticles"
                  className="block text-lg font-medium hover:text-indigo-600"
                >
                  Premium Articles
                </Link>
              </li>
            )}
          </ul>
        )}
      </nav>

      {/* Breaking News Marquee */}
      {/* <div className="flex gap-4 items-center py-4 pl-4 pr-20 bg-[#F3F3F3]">
        <p className="text-lg font-medium text-white bg-[#D72050] px-7 py-3">
          Latest
        </p>
        <Marquee
          pauseOnHover={true}
          speed={100}
          className="space-x-4 text-[#403F3F] text-lg font-semibold"
        >
          <Link to={"/news"}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus laudantium explicabo.
          </Link>
          <Link to={"/news"}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus laudantium explicabo.
          </Link>
          <Link to={"/news"}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus laudantium explicabo.
          </Link>
        </Marquee>
      </div> */}
    </div>
  );
};

export default Navbar;
