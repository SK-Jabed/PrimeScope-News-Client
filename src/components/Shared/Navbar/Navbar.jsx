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

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import moment from "moment";
import avatarImg from "../../../assets/placeholder.jpg";
import useAuth from "../../../hooks/useAuth"; // Authentication Hook
import useUserData from "../../../hooks/useUserData";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Ensure it's installed
import { Button } from "@/components/ui/button"; // Shadcn UI Button

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const { data: userData } = useUserData(user?.email);
  const isAdmin = userData?.role === "admin";

  return (
    <header className="w-full bg-white shadow-md sticky top-0 left-0 z-50">
      {/* Top Header */}
      <div className="flex justify-between items-center px-6 py-2 border-b">
        <span className="text-gray-600 flex items-center gap-2">
          <BsCalendar2Date className="text-lg" />
          {moment().format("dddd, MMMM D, YYYY")}
        </span>

        <h1 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-500 via-purple-600 to-rose-400 bg-clip-text">
          PrimeScope News
        </h1>

        <Button
          onClick={() => navigate("/subscription")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Subscribe
        </Button>
      </div>

      {/* Navbar */}
      <nav className="w-full border-t border-b bg-white ">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Hamburger Menu */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl text-gray-700 focus:outline-none"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation Links */}
          <ul className="hidden lg:flex gap-6 font-semibold">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/articles" className="hover:text-blue-600">
                All Articles
              </Link>
            </li>
            <li>
              <Link to="/addArticle" className="hover:text-blue-600">
                Add Articles
              </Link>
            </li>
            <li>
              <Link to="/subscription" className="hover:text-blue-600">
                Subscription
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
              </li>
            )}
            {userData?.isPremium && (
              <li>
                <Link to="/premiumArticles" className="hover:text-blue-600">
                  Premium Articles
                </Link>
              </li>
            )}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Button
                  onClick={() => navigate("/authentication/login")}
                  variant="outline"
                >
                  <MdOutlineLogin className="mr-1" /> Login
                </Button>
                <Button
                  onClick={() => navigate("/authentication/register")}
                  variant="outline"
                >
                  <AiOutlineUserAdd className="mr-1" /> Register
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    src={userData?.image || avatarImg}
                    alt="User"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/myArticles">My Articles</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logOut}>
                    <MdOutlineLogout className="mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar Menu */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold">PrimeScope News</h2>
          <p className="text-sm text-gray-500">Your gateway to breaking news</p>
        </div>

        <ul className="px-6 space-y-4">
          <li>
            <Link to="/" className="block text-lg hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/articles" className="block text-lg hover:text-blue-600">
              All Articles
            </Link>
          </li>
          <li>
            <Link
              to="/addArticle"
              className="block text-lg hover:text-blue-600"
            >
              Add Articles
            </Link>
          </li>
          <li>
            <Link
              to="/subscription"
              className="block text-lg hover:text-blue-600"
            >
              Subscription
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                to="/dashboard"
                className="block text-lg hover:text-blue-600"
              >
                Dashboard
              </Link>
            </li>
          )}
          {userData?.isPremium && (
            <li>
              <Link
                to="/premiumArticles"
                className="block text-lg hover:text-blue-600"
              >
                Premium Articles
              </Link>
            </li>
          )}
        </ul>
      </aside>

      {/* Click anywhere to close Sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}
    </header>
  );
};

export default Navbar;
