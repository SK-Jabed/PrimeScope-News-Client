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
import DashboardLayout from "../layouts/DashboardLayout";

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
        element: <SubscriptionPage />,
      },
    ],
  },
  {
    path: "/authentication",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
    ],
  },
//   {
//     path: "/dashboard",
//     element: (
//       <PrivateRoute>
//         <DashboardLayout />
//       </PrivateRoute>
//     ),
//     children: [
//       {
//         index: true,
//         element: (
//           <PrivateRoute>
//             <Statistics />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "add-plant",
//         element: (
//           <PrivateRoute>
//             <SellerRoute>
//               <AddPlant />
//             </SellerRoute>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "my-inventory",
//         element: (
//           <PrivateRoute>
//             <SellerRoute>
//               <MyInventory />
//             </SellerRoute>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "manage-users",
//         element: (
//           <PrivateRoute>
//             <AdminRoute>
//               <ManageUsers />
//             </AdminRoute>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "profile",
//         element: (
//           <PrivateRoute>
//             <Profile />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "my-orders",
//         element: (
//           <PrivateRoute>
//             <MyOrders />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "manage-orders",
//         element: (
//           <PrivateRoute>
//             <SellerRoute>
//               <ManageOrders />
//             </SellerRoute>
//           </PrivateRoute>
//         ),
//       },
//     ],
//   },
]);
