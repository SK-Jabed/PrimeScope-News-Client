// import React from "react";
// import { useForm } from "react-hook-form";
// import Select from "react-select";
// import { imageUpload } from "../../api/utils";
// import usePublishers from "../../hooks/usePublishers";

// const AddArticleForm = ({ onSubmit }) => {
//   const { register, handleSubmit, setValue, watch } = useForm();
//   const { publishers, isLoading } = usePublishers();

//   const handleImageUpload = async (file) => {
//     const imageUrl = await imageUpload(file);
//     setValue("image", imageUrl);
//   };

//   const publisherOptions = publishers?.map((publisher) => ({
//     value: { publisherName: publisher.name, publisherLogo: publisher.logo },
//     label: publisher.name,
//   }));

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto"
//     >
//       <h2 className="text-2xl font-bold mb-4">Add New Article</h2>

//       {/* Title */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Title</label>
//         <input
//           type="text"
//           {...register("title", { required: true })}
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           placeholder="Enter article title"
//         />
//       </div>

//       {/* Image */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Image</label>
//         <input
//           type="file"
//           onChange={(e) => handleImageUpload(e.target.files[0])}
//           className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//         />
//       </div>

//       {/* Publisher */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Publisher</label>
//         <Select
//           options={publisherOptions}
//           isLoading={isLoading}
//           onChange={(selected) => setValue("publisher", selected.value)}
//           placeholder="Select Publisher"
//         />
//       </div>

//       {/* Tags */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Tags</label>
//         <Select
//           isMulti
//           options={[
//             { value: "Technology", label: "Technology" },
//             { value: "Health", label: "Health" },
//             { value: "Science", label: "Science" },
//           ]}
//           onChange={(selected) =>
//             setValue(
//               "tags",
//               selected.map((option) => option.value)
//             )
//           }
//           placeholder="Select Tags"
//         />
//       </div>

//       {/* Description */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Description</label>
//         <textarea
//           {...register("description", { required: true })}
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           placeholder="Enter article description"
//         ></textarea>
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default AddArticleForm;



import React from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
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
        className="w-full bg-indigo-600 text-white mt-6 py-3 rounded-lg font-medium text-base hover:bg-indigo-700 transition duration-300"
      >
        Submit Article
      </button>
    </form>
  );
};

export default AddArticleForm;
