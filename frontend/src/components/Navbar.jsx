import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  // console.log(user);

  return (
    <div>
      <div className="navbar bg-black shadow-sm">
        <div className="flex-1">
          <Link to="/">DevTinder</Link>
        </div>
        {user && (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end flex items-center">
            <div className="font-bold capitalize">Welcome, {user.data.firstName}</div>

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-5"
              >

                <div className="w-10 rounded-full">
                  <img
                    alt="user photo"
                    src={user.data.photoUrl}
                  />
                </div> 
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
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
