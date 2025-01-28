// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import Swal from "sweetalert2";
// import useAxiosSecure, { axiosSecure } from "../../../hooks/useAxiosSecure";
// import { imageUpload } from "../../../api/utils"

// const AddPublisher = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const [loading, setLoading] = useState(false);
//   const axiosPublic = useAxiosSecure();

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       // Upload logo image to imgbb
//       const logoUrl = await imageUpload(data.logo[0]);

//       // Prepare publisher data
//       const publisherInfo = {
//         name: data.name,
//         logo: logoUrl,
//         createdAt: new Date(),
//       };

//       // Save publisher data to the database
//       const response = await axiosSecure.post("/publishers", publisherInfo);
//       if (response.data.insertedId) {
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Publisher added successfully!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         reset(); // Reset form
//       } else {
//         toast.error("Failed to add publisher. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error adding publisher:", error);
//       toast.error("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center mb-4">Add Publisher</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Publisher Name */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium">
//               Publisher Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               placeholder="Enter publisher name"
//               {...register("name", { required: true })}
//               className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm">
//                 Publisher name is required.
//               </p>
//             )}
//           </div>

//           {/* Publisher Logo */}
//           <div>
//             <label htmlFor="logo" className="block text-sm font-medium">
//               Publisher Logo
//             </label>
//             <input
//               type="file"
//               id="logo"
//               accept="image/*"
//               {...register("logo", { required: true })}
//               className="w-full mt-1"
//             />
//             {errors.logo && (
//               <p className="text-red-500 text-sm">
//                 Publisher logo is required.
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-lime-500 text-white py-2 rounded-md hover:bg-lime-600"
//             disabled={loading}
//           >
//             {loading ? "Adding Publisher..." : "Add Publisher"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddPublisher;



import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure, { axiosSecure } from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/utils";

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
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        {/* Title and Description */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-violet-500 text-transparent bg-clip-text">
            Add Publisher
          </h2>
          <p className="text-gray-600">
            Add details of a new publisher to expand the collection.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Publisher Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Publisher Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter publisher name"
              {...register("name", { required: true })}
              className="w-full mt-2 px-4 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                Publisher name is required.
              </p>
            )}
          </div>

          {/* Publisher Logo */}
          <div>
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700"
            >
              Publisher Logo
            </label>
            <div className="mt-2 border border-purple-300 rounded-md p-4 bg-purple-50 shadow-sm">
              <input
                type="file"
                id="logo"
                accept="image/*"
                {...register("logo", { required: true })}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-semibold file:bg-[#EDE9FE] file:text-indigo-600 hover:file:bg-indigo-100"
              />
              <p className="mt-2 text-xs text-gray-500">
                Upload a high-quality logo in JPG, PNG, or SVG format.
              </p>
            </div>
            {errors.logo && (
              <p className="text-red-500 text-sm mt-1">
                Publisher logo is required.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-200"
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
