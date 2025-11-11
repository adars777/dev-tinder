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
    try {
      const res = axios.post("/api/v2/users/register", data, {
        withCredentials: true,
      });
      console.log(res.data.message);

      navigate("/login");
    } catch (error) {
      console.error("Error is:", error);
    }
  };
  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 mx-auto mt-20 mb-20">
          {/* firstname and last name */}
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
              <label className="label font-semibold text-slate-200 ">
                First Name
              </label>

              <input
                type="text"
                placeholder="First name"
                className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
                {...register("First name", { required: true, maxLength: 80 })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="label font-semibold text-slate-200 ">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Last name"
                className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
                {...register("Last name", { required: true, maxLength: 100 })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="label font-semibold text-slate-200 ">Email</label>

            <input
              type="text"
              placeholder="Email"
              className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
              {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="label font-semibold text-slate-200 ">About</label>

            <textarea
              className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
              placeholder="Text here..."
              {...register("about", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="label font-semibold text-slate-200 ">
              Password
            </label>
            <input
              type="password"
              className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
              placeholder="password"
              {...register("password", { required: true, max: 30, min: 8 })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="label font-semibold text-slate-200 ">Age</label>
            <input
              type="number"
              className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
              placeholder="age"
              {...register("age", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="label font-semibold text-slate-200 ">
              Skills
            </label>{" "}
            <input
              type="text"
              className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
              placeholder="Skills"
              {...register("skills", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="label font-semibold text-slate-200 ">
              Gender
            </label>{" "}
            <div className="flex flex-row gap-4 font-semibold">
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

          <div className="flex flex-col gap-2">
            <label className="label font-semibold text-slate-200 ">
              Photo URL
            </label>

            <input
              type="text"
              className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
              placeholder="photo URL"
              {...register}
            />
          </div>

          <p className="flex justify-between mt-5">
            <span className="font-semibold">Already have an Account? </span>
            <Link
              className="gap-4 font-semibold text-blue-400 hover:text-blue-500"
              to="/login"
            >
              Login{" "}
            </Link>
          </p>
          <input className="btn btn-neutral mt-4" type="submit" />
        </fieldset>
      </form>
    </div>
  );
}
