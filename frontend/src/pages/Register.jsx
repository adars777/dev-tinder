import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {

    console.log(data);
    
    try {
      const res = axios.post("/api/v2/users/register", data, {
        withCredentials: true,
      });
      console.log(res);

      navigate("/login");
    } catch (error) {
      console.error("Error is:", error);
    }
  };
  console.log(errors);

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-repeat bg-center bg-auto font-bold">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md px-6">
        <fieldset className="fieldset shadow-black shadow-2xl  w-normal rounded-xs p-4 m-auto backdrop-blur-xs ">
          <h1 className="text-2xl  font-semibold text-center mb-5">Sign up</h1>

          {/* firstname and last name */}
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
              <label className="label font-bold  text-white ">First Name</label>

              <input
                type="text"
                placeholder="First name"
                className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
                {...register("firstName", { required: true, maxLength: 80 })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="label font-bold  text-white ">Last Name</label>

              <input
                type="text"
                placeholder="Last name"
                className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
                {...register("lastName", { required: true, maxLength: 100 })}
              />
            </div>
          </div>

          {/* email and password section  */}
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col ">
              <label className="label font-bold  text-white ">Email</label>

              <input
                type="text"
                placeholder="Email"
                className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>

            <div className="flex flex-col ">
              <label className="label font-bold  text-white ">Password</label>
              <input
                type="password"
                className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
                placeholder="password"
                {...register("password", { required: true, max: 30, min: 8 })}
              />
            </div>
          </div>

          {/* about section  */}
          <div className="flex flex-col gap-2">
            <label className="label font-bold  text-white ">About</label>

            <textarea
              className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
              placeholder="Text here..."
              {...register("about")}
            />
          </div>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
              <label className="label font-bold  text-white ">Age</label>
              <input
                type="number"
                className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
                placeholder="age"
                {...register("age", { required: true })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="label font-bold  text-white ">Skills</label>{" "}
              <input
                type="text"
                className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
                placeholder="HTML, CSS, JS, ..."
                {...register("skills", { required: true })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 text-white font-bold">
            <label className="label font-bold  text-white ">Gender</label>{" "}
            <div className="flex flex-row gap-4 font-bold ">
              <input
                {...register("gender", { required: true })}
                type="radio"
                value="male"
              />{" "}
              Male
              <input
                {...register("gender", { required: true })}
                type="radio"
                value=" female"
              />{" "}
              Female
              <input
                {...register("gender", { required: true })}
                type="radio"
                value=" others"
              />{" "}
              Others
            </div>
          </div>

       

          <p className="flex gap-2 mt-2">
            <span className="font-bold ">Already have an Account? </span>
            <Link
              className="gap-4 font-bold  text-blue-400 hover:text-blue-500"
              to="/login"
            >
              Sign In{" "}
            </Link>
          </p>
          <input
            className="btn btn-neutral bg-transparent rounded-xs text-white border-white border-1.5  font-bold mt-4 hover:border-none hover:bg-black hover:text-white"
            type="submit"
          />
        </fieldset>
      </form>
    </div>
  );
}
