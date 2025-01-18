import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { createNewUser, updateUserProfile, signInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Upload Image to ImageBB
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imageResponse = await axiosPublic.post(
        image_hosting_api,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (imageResponse.data.success) {
        const photoURL = imageResponse.data.data.display_url;

        // Create a new user
        const result = await createNewUser(data.email, data.password);
        const loggedUser = result.user;

        // Update user profile with name and photo
        await updateUserProfile(data.name, photoURL);

        // Save user data in the database
        const userInfo = {
          name: data.name,
          email: data.email,
          image: photoURL,
          role: "user",
          timestamp: Date.now(),
          premiumTaken: null,
        };

        const dbResponse = await axiosPublic.post("/users", userInfo);

        if (dbResponse.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Registered Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          navigate("/");
        }
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-in

const handleGoogleSignIn = async () => {
  setLoading(true);

  try {
    // Perform Google sign-in
    const result = await signInWithGoogle();
    const { displayName: name, email, photoURL } = result.user;

    // Prepare user data
    const userInfo = {
      name,
      email,
      image: photoURL,
      role: "user", // Default role
      timestamp: Date.now(),
      premiumTaken: null,
    };

    // Save user data to the database
    const dbResponse = await axiosPublic.post("/users", userInfo);

    if (dbResponse.data.insertedId) {
      // New user added to the database
      toast.success("Account created successfully. Welcome!");
      navigate(from, { replace: true });
    } else if (dbResponse.data.message === "User already exists") {
      // User already exists in the database
      toast.success("Welcome back! You are already registered.");
      navigate("/");
    } else {
      // Handle unexpected cases
      toast.error("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error("Google Sign-in Error:", err);
    toast.error("Google Sign-in failed. Please try again.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Helmet>
        <title>PrimeScope News | Register</title>
      </Helmet>
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to PrimeScope News</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter Your Name"
                className="w-full px-3 py-2 border rounded-md bg-gray-200"
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                {...register("image", {
                  required: "Profile image is required",
                })}
                accept="image/*"
              />
              {errors.image && (
                <p className="text-red-600">{errors.image.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter Your Email"
                className="w-full px-3 py-2 border rounded-md bg-gray-200"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    message:
                      "Password must contain uppercase, lowercase, number, and special character",
                  },
                })}
                placeholder="Enter Your Password"
                className="w-full px-3 py-2 border rounded-md bg-gray-200"
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-lime-500 w-full rounded-md py-3 text-white"
            disabled={loading}
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          <p className="px-3 text-sm text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/authentication/login"
            className="hover:underline text-lime-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
