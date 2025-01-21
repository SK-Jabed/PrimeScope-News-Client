import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import AllArticles from "../pages/UserPages/AllArticles";
import AddArticle from "../pages/UserPages/AddArticle";
import SubscriptionPage from "../pages/UserPages/SubscriptionPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPublisher from "../pages/Dashboard/AdminPages/AddPublisher";
import ManageUsers from "../pages/Dashboard/AdminPages/ManageUsers";
import ProfilePage from "../pages/UserPages/ProfilePage";
import Statistics from "../pages/Dashboard/Common/Statistics";
import AdminArticles from "../pages/Dashboard/AdminPages/AdminArticles";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "articles",
        element: <AllArticles />,
      },
      {
        path: "addArticle",
        element: <AddArticle />,
      },
      {
        path: "subscription",
        element: (
          <PrivateRoute>
            <SubscriptionPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/authentication",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "addPublisher",
        element: (
          <PrivateRoute>
            <AddPublisher />
          </PrivateRoute>
        ),
      },
      // {
      //   path: "my-inventory",
      //   element: (
      //     <PrivateRoute>
      //       <MyInventory />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "manageUsers",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "allArticles",
        element: (
          <PrivateRoute>
            <AdminArticles />
          </PrivateRoute>
        ),
      },
      // {
      //   path: "manage-orders",
      //   element: <ManageOrders />,
      // },
    ],
  },
]);
