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

  // const getprofile = async () => {
  //   try {
  //     const res = await axios.get("/api/v2/profile/feed", {
  //       withCredentials: true,
  //     });
  //     dispatch(addUser(res.data.data));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getprofile();
  // }, []);

  return (
    user && (
      <div>
        <EditProfile user={user.data} />
      </div>
    )
  );
};

export default Profile;
