import React from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../api/utils";
import usePublishers from "../../hooks/usePublishers";

const AddArticleForm = ({ onSubmit }) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const { publishers, isLoading } = usePublishers();

  const handleImageUpload = async (file) => {
    const imageUrl = await imageUpload(file);
    setValue("image", imageUrl);
  };

  const publisherOptions = publishers?.map((publisher) => ({
    value: { publisherName: publisher.name, publisherLogo: publisher.logo },
    label: publisher.name,
  }));

  const resetForm = () => reset();

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, resetForm))}
      className="bg-white shadow-2xl rounded-xl p-6 max-w-2xl mx-auto"
    >
      {/* Title */}
      <h2 className="text-4xl font-medium text-center font-robotoSlab bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-700">
        Add New Article
      </h2>
      <p className="text-center text-gray-500 mt-1">
        Share your insights and stories with the world by submitting an article.
      </p>

      {/* Form Fields */}
      <div className="mt-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter article title"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Image</label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
          />
        </div>

        {/* Publisher */}
        <div>
          <label className="block text-sm font-medium mb-2">Publisher</label>
          <Select
            options={publisherOptions}
            isLoading={isLoading}
            onChange={(selected) => setValue("publisher", selected.value)}
            placeholder="Select Publisher"
            className="rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Tags */}
        <div>
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
            className="rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter article description"
            rows={4}
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg hover:transition duration-300 active:105"
      >
        Submit Article
      </button>
    </form>
  );
};

export default AddArticleForm;
