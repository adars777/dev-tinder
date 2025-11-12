import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setConnections } from "../utils/connectionSlice";
import { useSelector } from "react-redux";
import ConnectionCard from "../components/ConnectionCard";
const Connections = () => {
  const connections = useSelector((store) => store.connection);

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get("/api/v2/profile/connections", {
        withCredentials: true,
      });

      dispatch(setConnections(res?.data?.message));
      // console.log(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  return (
      
      <div className="text-3xl font-semibold mt-25">
        <div className="text-3xl font-bold underline text-center">My Connections</div>
        {connections &&
          connections.map((user, index) => (
            <ConnectionCard key={index} user={user} />
          ))}
      </div>
  );
};

export default Connections;
