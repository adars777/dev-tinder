import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((store) => store.user);

  return <div>
    <div>
        <h1 className="font-semibold text-3xl mt-10 text-center">
            This is <span className="capitalize">{userData.data.firstName} {userData.data.lastName}</span>'s Profile Page
        </h1>
    </div>
    <div>
        <h1>Name: {userData.data.firstName}{userData.data.lastName}</h1>
        <h1>Email: {userData.data.email}</h1>
        <h1>Bio: {userData.data.about}</h1>
        
    </div>
  </div>;
};

export default Profile;
