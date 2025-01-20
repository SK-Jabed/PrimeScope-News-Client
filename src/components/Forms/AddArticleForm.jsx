import React from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { imageUpload } from "../../api/utils";
import usePublishers from "../../hooks/usePublishers";

const AddArticleForm = ({ onSubmit }) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { publishers, isLoading } = usePublishers();

  const handleImageUpload = async (file) => {
    const imageUrl = await imageUpload(file);
    setValue("image", imageUrl);
  };

  const publisherOptions = publishers?.map((publisher) => ({
    value: { publisherName: publisher.name, publisherLogo: publisher.logo },
    label: publisher.name,
  }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Article</h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter article title"
        />
      </div>

      {/* Image */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Image</label>
        <input
          type="file"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      {/* Publisher */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Publisher</label>
        <Select
          options={publisherOptions}
          isLoading={isLoading}
          onChange={(selected) => setValue("publisher", selected.value)}
          placeholder="Select Publisher"
        />
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Tags</label>
        <Select
          isMulti
          options={[
            { value: "Technology", label: "Technology" },
            { value: "Health", label: "Health" },
            { value: "Science", label: "Science" },
          ]}
          onChange={(selected) =>
            setValue(
              "tags",
              selected.map((option) => option.value)
            )
          }
          placeholder="Select Tags"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          {...register("description", { required: true })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter article description"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
};

export default AddArticleForm;
