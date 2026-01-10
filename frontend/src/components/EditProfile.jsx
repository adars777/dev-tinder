import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfileForm = ({ user }) => {
  const dispatch = useDispatch();

  // --- Photo state (preview + selected file) ---
  const [preview, setPreview] = useState(user?.photoUrl || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      age: user?.age || "",
      skills: user?.skills || "",
      about: user?.about || "",
    },
  });

  // ----- TEXT FIELDS SUBMIT -----
  const onSubmit = async (data) => {
    try {
      const res = await api.patch("/api/v2/users/profile/edit", data, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      alert("Profile updated successfully.");
      // Optionally update preview if backend returns fresh photoUrl
      if (res.data?.photoUrl) setPreview(res.data.photoUrl);
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to update profile");
    }
  };

  // ----- PHOTO PICK -----
  const onPickPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/^image\/(png|jpe?g|webp|gif)$/i.test(file.type)) {
      alert("Please select an image (png, jpg, webp, gif).");
      e.target.value = "";
      return;
    }
    setAvatarFile(file);
    const url = URL.createObjectURL(file);
    if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(url);
  };

  // ----- UPLOAD PHOTO (separate API) -----
  const uploadPhoto = async () => {
    if (!avatarFile) return alert("Choose a photo first.");
    try {
      setUploading(true);

      const form = new FormData();
      form.append("avatar", avatarFile); // must match multer.single("avatar")

      const res = await api.patch("/api/v2/users/profile/uploadphoto", form, {
        withCredentials: true,
      });

      // Prefer taking the updated user from response
      const updatedUser = res.data?.user || res.data;
      if (updatedUser) {
        dispatch(addUser(updatedUser));
        if (updatedUser.photoUrl) setPreview(updatedUser.photoUrl);
      }
      alert("Photo uploaded successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white  p-8 rounded-lg shadow-md w-full max-w-2xl space-y-5"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Edit Profile
        </h2>

        <div className="flex justify-between gap-11 ">
          {/* ---- PHOTO SECTION (separate upload) ---- */}
          <div className="flex flex-col items-center gap-3 w-[30%]">
            {preview ? (
              <img
                src={preview}
                alt="Avatar preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 border-double"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 grid place-items-center text-gray-600">
                No Image
              </div>
            )}

            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              onChange={onPickPhoto}
              className="hidden"
            />
            <label
              htmlFor="avatar-input"
              className="cursor-pointer px-1 border rounded-xs bg-gray-200 border-gray-400 text-gray-800 hover:bg-gray-300"
            >
              Choose Photo
            </label>

            <button
              type="button"
              onClick={uploadPhoto}
              disabled={uploading || !avatarFile}
              className="px-2 py-1 inline bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
            {/* 
      
          )} */}
          </div>

          {/* ---- TEXT FIELDS ---- */}

          <div className="w-[70%] flex flex-col gap-3">
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: true })}
              className="w-full text-black px-4 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName", { required: true })}
              className="w-full text-black px-4 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Age"
              {...register("age", { required: true })}
              className="w-full text-black px-4 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Skills"
              {...register("skills", { required: true })}
              className="w-full text-black px-4 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="About"
              {...register("about", { required: true })}
              className="w-full text-black px-4 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full text-white cursor-pointer bg-blue-500 font-semibold py-1 rounded hover:bg-blue-600 transition"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
