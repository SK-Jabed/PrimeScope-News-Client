import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { imageUpload } from "../../api/utils";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {
  const { createNewUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    const imageFile = { image: data.image[0] };

    // Send Image Data to ImageBB
    const photoURL = imageUpload(imageFile);
    console.log(data);

    createNewUser(data.email, photoURL).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          console.log("user profile info updated");
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        })
        .catch((error) => console.log(error))

        // updateUserProfile(data.name, photoURL)
        //   .then(() => {
        //     // Create User Entity in The Database
        //     const userInfo = {
        //       name: data.name,
        //       email: data.email,
        //     };

        //     axiosPublic.post("/users", userInfo).then((res) => {
        //       if (res.data.insertedId) {
        //         console.log("User Added to The Database");
        //         Swal.fire({
        //           position: "center",
        //           icon: "success",
        //           title: "User Created Successfully.",
        //           showConfirmButton: false,
        //           timer: 1500,
        //         });
        //         navigate("/");
        //       }
        //     });

        //     reset();
        //   })
        // .catch((error) => console.log(error));
    });
  };

  // Form submit handler
  // const handleSubmitForm = async (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const name = form.name.value;
  //   const email = form.email.value;
  //   const password = form.password.value;
  //   const image = form.image.files[0];

  //   // 1. Send Image Data to ImageBB
  //   const photoURL = await imageUpload(image);

  //   try {
  //     // 2. User Registration
  //     const result = await createNewUser(email, password);

  //     // 3. Save username & profile photo
  //     await updateUserProfile(name, photoURL);
  //     console.log(result);

  //     navigate("/");
  //     toast.success("Signup Successful");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err?.message);
  //   }
  // };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      await signInWithGoogle();

      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
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
          <p className="text-sm text-gray-400">Welcome to PlantNet</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                required
                type="text"
                name="name"
                id="name"
                {...register("name", { required: true })}
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                {...register("image", { required: true })}
                accept="image/*"
              />
              {errors.image && (
                <span className="text-red-600">Image is required</span>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email", { required: true })}
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase, one lower case, one number
                  and one special character.
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/authentication/login"
            className="hover:underline hover:text-lime-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
