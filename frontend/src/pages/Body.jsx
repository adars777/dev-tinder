import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {

    try {
      const res = await axios.get("/api/v2/users/profile", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (error) {
      // if any error (not authenticated etc.) redirect to login
      Navigate("/login");
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
