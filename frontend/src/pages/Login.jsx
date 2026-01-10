import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/v2/users/login", data, {
        withCredentials: true, // this with credentials is for send cookies and stores in web browser
      });
      // console.log(res.data);
      dispatch(addUser(res.data.user));
      alert("Logged In Successfully..");
      navigate("/feed");
      window.location.reload();
    } catch (error) {
      if (error.status === 500) {
        setError("Invalid Credentials Please try Again!!");
      }
      console.error(error);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-repeat bg-center bg-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md px-6">
        <fieldset className="fieldset shadow-black shadow-2xl  w-xs rounded-xs p-4 m-auto backdrop-blur-xl">
          <h1 className="text-2xl  font-semibold text-center">Sign In</h1>

          <div className="flex flex-col gap-2">
            <label className="label font-semibold text-white ">Email</label>

            <input
              type="text"
              placeholder="Email"
              className="focus:outline-none border-2 bg-transparent p-2 text-white font-bold border-white"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="label font-semibold text-white">Password</label>

            <input
              type="password"
              className="focus:outline-none border-2 bg-transparent p-2 text-white font-bold border-white"
              placeholder="Password"
              {...register("password", {
                required: true,
                min: 8,
                maxLength: 20,
              })}
            />
            <div className="text-red-700 font-semibold ">{error}</div>
          </div>
          <p className="flex gap-2 text-white">
            <span className="font-semibold">I Don't have an Account? </span>
            <Link
              className="justify-between font-bold text-blue-500 hover:text-blue-800"
              to="/register"
            >
              Sign Up{" "}
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
};

export default Login;
