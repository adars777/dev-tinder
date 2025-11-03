import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfileForm = ({ user }) => {

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      age: user?.age || "",
      skills: user?.skills || "",
      about: user?.about || "",
    },
  });

  const onSubmit = async (data) => {
    try {
     const res =  await axios.patch(
        "/api/v2/users/profile/edit",
        data,
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      console.log(res);
      
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Edit Profile
        </h2>
        <input
          type="text"
          placeholder="First Name"
          {...register("firstName", { required: true })}
          className="w-full text-black px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Last Name"
          {...register("lastName", { required: true })}
          className="w-full text-black px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Age"
          {...register("age", { required: true })}
          className="w-full text-black px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Skills"
          {...register("skills", { required: true })}
          className="w-full text-black px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="About"
          {...register("about", { required: true })}
          className="w-full text-black px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full text-black bg-blue-500  font-semibold py-2 rounded hover:bg-blue-600 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;