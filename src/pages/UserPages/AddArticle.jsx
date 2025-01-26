import React from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import AddArticleForm from "../../components/Forms/AddArticleForm";
import useAuth from "../../hooks/useAuth";

const AddArticle = () => {
  const { user } = useAuth();



  const handleArticleSubmit = async (data) => {
    try {
      const response = await axiosSecure.post("/articles", {
        ...data,
        author: {
          name: user?.displayName || "Anonymous",
          email: user?.email || "unknown@example.com",
          photo: user?.photoURL || "https://i.ibb.co/placeholder-photo.jpg",
        },
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Article Submitted!",
          text: "Your article will be published after admin approval.",
        });
      }
    } catch (error) {
      if (error.response?.status === 403) {
        Swal.fire({
          icon: "warning",
          title: "Upgrade to Premium",
          text: error.response.data.message,
          footer: '<a href="/subscription">Upgrade Now</a>',
        });
      } else if (error.response?.status === 404) {
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: error.response?.data?.message || "Something went wrong.",
        });
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Helmet>
        <title>Add Article | PrimeScope News</title>
      </Helmet>
      <AddArticleForm onSubmit={handleArticleSubmit} />
    </div>
  );
};

export default AddArticle;




  // const handleArticleSubmit = async (data) => {
  //   try {
  //     const response = await axiosSecure.post("/articles", {
  //       ...data,
  //       author: {
  //         name: user?.displayName || "Anonymous",
  //         email: user?.email || "unknown@example.com",
  //         photo: user?.photoURL || "https://i.ibb.co/placeholder-photo.jpg",
  //       },
  //       postedDate: new Date().toISOString(),
  //       status: "pending", // Default status (pending, approved, declined)
        // declineReason: null, // Initially null
        // isPremium: false, // Initially not premium
  //       views: 0, // Track views
  //     });

  //     if (response.data.insertedId) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Article Submitted!",
  //         text: "Your article will be published after admin approval.",
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Submission Failed",
  //       text: error.message,
  //     });
  //   }
  // };