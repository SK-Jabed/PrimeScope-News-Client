import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { imageUpload } from "../../api/utils";
import usePublishers from "../../hooks/usePublishers";

const UpdateArticleForm = ({ onSubmit, defaultValues = {} }) => {
  const { register, handleSubmit, setValue } = useForm({ defaultValues });
  const { publishers, isLoading } = usePublishers();

  const handleImageUpload = async (file) => {
    try {
      const imageUrl = await imageUpload(file);
      setValue("image", imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const publisherOptions = publishers?.map((publisher) => ({
    value: { publisherName: publisher.name, publisherLogo: publisher.logo },
    label: publisher.name,
  }));

  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach((key) => {
        setValue(key, defaultValues[key]);
      });
    }
  }, [defaultValues, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto space-y-6"
    >
      <div className="text-center mb-8">
              <h1 className="text-4xl font-robotoSlab font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Update Your Article
              </h1>
              <p className="text-gray-500 mt-1 text-lg">
                Modify and refine your article below to ensure it stands out.
              </p>
            </div>
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8974DD]"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium mb-2">Image</label>
        <input
          type="file"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-semibold file:bg-[#EDE9FE] file:text-indigo-600 hover:file:bg-indigo-100"
        />
        {defaultValues.image && (
          <img
            src={defaultValues.image}
            alt="Current"
            className="mt-4 h-20 rounded-md"
          />
        )}
      </div>

      {/* Publisher */}
      <div>
        <label className="block text-sm font-medium mb-2">Publisher</label>
        <Select
          options={publisherOptions}
          isLoading={isLoading}
          defaultValue={publisherOptions?.find(
            (option) => option.label === defaultValues.publisher?.publisherName
          )}
          onChange={(selected) =>
            setValue("publisher", {
              publisherName: selected.value.publisherName,
              publisherLogo: selected.value.publisherLogo,
            })
          }
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
          defaultValue={defaultValues.tags?.map((tag) => ({
            value: tag,
            label: tag,
          }))}
          onChange={(selected) =>
            setValue(
              "tags",
              selected.map((option) => option.value)
            )
          }
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          {...register("description", { required: true })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8974DD]"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-red-400 text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg hover:transition duration-300 active:105"
      >
        Update Article
      </button>
    </form>
  );
};

export default UpdateArticleForm;
