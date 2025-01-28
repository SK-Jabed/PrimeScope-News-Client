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
import ProfilePage from "../pages/Dashboard/Common/ProfilePage";
import Statistics from "../pages/Dashboard/Common/Statistics";
import AdminArticles from "../pages/Dashboard/AdminPages/AdminArticles";
import PremiumArticles from "../pages/UserPages/PremiumArticles";
import MyArticlesPage from "../pages/UserPages/MyArticles";
import UpdateArticle from "../pages/UserPages/UpdateArticle";
import ArticleDetails from "../pages/UserPages/ArticleDetails";
import PaymentPage from "../modules/PaymentPage";

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
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
      },
      {
        path: "updateArticle/:id",
        element: (
          <PrivateRoute>
            <UpdateArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "myArticles",
        element: (
          <PrivateRoute>
            <MyArticlesPage />
          </PrivateRoute>
        ),
      },
      {
        path: "articleDetails/:id",
        element: (
          <PrivateRoute>
            <ArticleDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "premiumArticles",
        element: (
          <PrivateRoute>
            <PremiumArticles />
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
