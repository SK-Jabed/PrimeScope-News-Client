import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import moment from "moment";
import avatarImg from "../../../assets/placeholder.jpg";
import useAuth from "../../../hooks/useAuth";
import useUserData from "../../../hooks/useUserData";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../ThemeToggle";
import Container from "../Container";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const { data: userData } = useUserData(user?.email);
  const isAdmin = userData?.role === "admin";

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 left-0 z-50">
      {/* Top Header */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <Container>
          <div className="flex justify-between items-center px-6 py-2">
            <span className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <BsCalendar2Date className="text-lg" />
              {moment().format("dddd, MMMM D, YYYY")}
            </span>

            <h1 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-500 via-purple-600 to-rose-400 bg-clip-text">
              PrimeScope News
            </h1>

            <Button
              onClick={() => navigate("/subscription")}
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Subscribe
            </Button>
          </div>
        </Container>
      </div>

      {/* Navbar */}
      <Container>
        <nav className="w-full border-t border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Hamburger Menu */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-2xl text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Navigation Links */}
            <ul className="hidden lg:flex gap-6 font-semibold text-gray-700 dark:text-gray-300">
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-blue-600 dark:hover:text-blue-400">
                  All Articles
                </Link>
              </li>
              <li>
                <Link to="/addArticle" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Add Articles
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Subscription
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">
                    Dashboard
                  </Link>
                </li>
              )}
              {userData?.isPremium && (
                <li>
                  <Link to="/premiumArticles" className="hover:text-blue-600 dark:hover:text-blue-400">
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
                    className="dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <MdOutlineLogin className="mr-1" /> Login
                  </Button>
                  <Button
                    onClick={() => navigate("/authentication/register")}
                    variant="outline"
                    className="dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-700"
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
                  <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="dark:text-gray-300">
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/myArticles" className="dark:text-gray-300">
                        My Articles
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logOut} className="dark:text-red-400">
                      <MdOutlineLogout className="mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </Container>

      {/* Sidebar Menu */}
      <Container>
        <aside
          className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50`}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-300">PrimeScope News</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your gateway to breaking news
            </p>
          </div>

          <ul className="px-6 space-y-4 text-gray-900 dark:text-gray-300">
            <li>
              <Link to="/" className="block text-lg hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/articles" className="block text-lg hover:text-blue-600 dark:hover:text-blue-400">
                All Articles
              </Link>
            </li>
            <li>
              <Link to="/addArticle" className="block text-lg hover:text-blue-600 dark:hover:text-blue-400">
                Add Articles
              </Link>
            </li>
            <li>
              <Link to="/subscription" className="block text-lg hover:text-blue-600 dark:hover:text-blue-400">
                Subscription
              </Link>
            </li>
          </ul>
        </aside>
      </Container>

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
