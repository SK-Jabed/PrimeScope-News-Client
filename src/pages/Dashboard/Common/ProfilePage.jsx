// import React from 'react';

// const ProfilePage = () => {
//     return (
//         <div>
//             Profile can be Updated here
//         </div>
//     );
// };

// export default ProfilePage;

// import React, { useState } from "react";
// import { useContext } from "react";
// import { AuthContext } from "../../../providers/AuthProvider";
// import { imageUpload } from "../../../api/utils";

// const ProfilePage = () => {
//   const { user, updateUserProfile, setUser } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     name: user?.displayName || "",
//     photo: user?.photoURL || "",
//   });
//   const [uploading, setUploading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);

//     try {
//       const uploadedImageUrl = await imageUpload(file);
//       setFormData((prev) => ({ ...prev, photo: uploadedImageUrl }));
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       alert("Failed to upload image. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await updateUserProfile(formData.name, formData.photo);
//       setUser((prev) => ({
//         ...prev,
//         displayName: formData.name,
//         photoURL: formData.photo,
//       }));
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium">Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="border p-2 w-full rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Upload Photo:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="border p-2 w-full rounded"
//           />
//         </div>
//         {uploading && <p className="text-blue-500">Uploading image...</p>}
//         {formData.photo && (
//           <div>
//             <img
//               src={formData.photo}
//               alt="Profile Preview"
//               className="w-24 h-24 rounded-full mb-2"
//             />
//           </div>
//         )}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//           disabled={uploading}
//         >
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useContext } from "react";
import { Dialog } from "@headlessui/react";
import { AuthContext } from "../../../providers/AuthProvider";
import { imageUpload } from "../../../api/utils";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, updateUserProfile, setUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photo: user?.photoURL || "",
  });
  const [uploading, setUploading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const uploadedImageUrl = await imageUpload(file);
      setFormData((prev) => ({ ...prev, photo: uploadedImageUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile(formData.name, formData.photo);
      setUser((prev) => ({
        ...prev,
        displayName: formData.name,
        photoURL: formData.photo,
      }));
      closeModal();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg absolute bottom-[-32px]"
          />
        </div>
        <div className="text-center mt-12 p-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {user?.displayName || "User"}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.email || "No email provided"}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            User Id: {user?.uid || "N/A"}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Address: Dhaka, Bangladesh
          </p>
          <button
            className="mt-6 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
            onClick={openModal}
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Update Profile Modal */}
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <Dialog.Title className="text-xl font-bold text-gray-800 border-b pb-2">
              Update Profile
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Name Field */}
              <div>
                <label className="block font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block font-medium text-gray-700">
                  Upload Photo:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded-lg"
                />
                {uploading && (
                  <p className="text-blue-500 mt-2">Uploading image...</p>
                )}
                {formData.photo && (
                  <img
                    src={formData.photo}
                    alt="Preview"
                    className="w-24 h-24 rounded-full mt-4 mx-auto"
                  />
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  disabled={uploading}
                >
                  Save
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProfilePage;