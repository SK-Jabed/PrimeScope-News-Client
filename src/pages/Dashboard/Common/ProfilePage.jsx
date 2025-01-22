// import React from 'react';

// const ProfilePage = () => {
//     return (
//         <div>
//             Profile can be Updated here
//         </div>
//     );
// };

// export default ProfilePage;



import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { imageUpload } from "../../../api/utils";

const ProfilePage = () => {
  const { user, updateUserProfile, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photo: user?.photoURL || "",
  });
  const [uploading, setUploading] = useState(false);

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
      alert("Failed to upload image. Please try again.");
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
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Upload Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border p-2 w-full rounded"
          />
        </div>
        {uploading && <p className="text-blue-500">Uploading image...</p>}
        {formData.photo && (
          <div>
            <img
              src={formData.photo}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full mb-2"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={uploading}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
