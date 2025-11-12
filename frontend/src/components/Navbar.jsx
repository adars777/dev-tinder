import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import {  removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import { removeFeed } from "../utils/feedSlice";

const Navbar = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/v2/users/logout", { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      Navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchUser = async () => {
  //   if (userData) return;
  //   try {
  //     const res = await axios.get("/api/v2/users/profile", {
  //       withCredentials: true,
  //     });

  //     // console.log(res.data.data);

  //     dispatch(addUser(res?.data?.data));
  //     // console.log(res.data.message);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    <div>
      <div className="navbar bg-black shadow-sm fixed top-0 z-10  ">
        <div className="flex-1">
          <Link to="/">DevTinder</Link>
        </div>
        {userData && (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end flex items-center">
              <div className="font-bold capitalize">
                Welcome, {userData.data.firstName}
              </div>

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-5"
              >
                <div className="w-10 rounded-full">
                  <img alt="user photo" src={userData.data.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-38 w-52 p-2 shadow"
              >
                <li>
                  {/* <a className="justify-between">
                    Profile
                  </a> */}
                  <Link className="justify-between" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="justify-between" to="/Connections">
                    Connections❤️
                  </Link>
                </li>
                <li>
                  <Link className="justify-between" to="/requests">
                    Connection Requests➕
                  </Link>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
