import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/v2/users/login", data, {
        withCredentials: true, // this with credentials is for send cookies and stores in web browser
      });
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20">
          <div className="flex flex-col gap-2">
            <label className="label font-semibold text-slate-200 ">Email</label>

            <input
              type="text"
              placeholder="Email"
              className="focus:outline-none border-1 bg-transparent p-2  border-gray-700"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="label font-semibold text-slate-00">
              Password
            </label>

            <input
              type="password"
              className="focus:outline-none border-1 bg-transparent p-2 border-gray-700"
              placeholder="Password"
              {...register("password", {
                required: true,
                min: 8,
                maxLength: 20,
              })}
            />
          </div>
          <input className="btn btn-neutral mt-4" type="submit" />
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
