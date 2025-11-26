import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
// import axios from "axios";
// import { addUser } from "../utils/userSlice";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

const Profile = () => {
  // const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  // console.log(user);

  return (
    user && (
      <div>
        <EditProfile user={user.data} />
      </div>
    )
  );
};

export default Profile;
