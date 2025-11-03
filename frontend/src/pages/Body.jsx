import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Body = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {

    try {
      const user = await axios.get("/api/v2/users/profile", {
        withCredewntials: true,
      });

      dispatch(addUser(user.data));
    } catch (error) {
      if (error.status === 500) {
        Navigate("/login");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
