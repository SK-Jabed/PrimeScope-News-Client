import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure, { axiosSecure } from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/utils"

const AddPublisher = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosSecure();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Upload logo image to imgbb
      const logoUrl = await imageUpload(data.logo[0]);

      // Prepare publisher data
      const publisherInfo = {
        name: data.name,
        logo: logoUrl,
        createdAt: new Date(),
      };

      // Save publisher data to the database
      const response = await axiosSecure.post("/publishers", publisherInfo);
      if (response.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Publisher added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset(); // Reset form
      } else {
        toast.error("Failed to add publisher. Please try again.");
      }
    } catch (error) {
      console.error("Error adding publisher:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Add Publisher</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Publisher Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Publisher Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter publisher name"
              {...register("name", { required: true })}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                Publisher name is required.
              </p>
            )}
          </div>

          {/* Publisher Logo */}
          <div>
            <label htmlFor="logo" className="block text-sm font-medium">
              Publisher Logo
            </label>
            <input
              type="file"
              id="logo"
              accept="image/*"
              {...register("logo", { required: true })}
              className="w-full mt-1"
            />
            {errors.logo && (
              <p className="text-red-500 text-sm">
                Publisher logo is required.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-lime-500 text-white py-2 rounded-md hover:bg-lime-600"
            disabled={loading}
          >
            {loading ? "Adding Publisher..." : "Add Publisher"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPublisher;
