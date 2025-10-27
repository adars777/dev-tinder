import React from "react";
import Navbar from "../components/Navbar";
import Login from "./login";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet/>
    </div>
  );
};

export default Body;
