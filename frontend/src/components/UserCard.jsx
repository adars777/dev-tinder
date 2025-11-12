import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sentRequest = async (status, id) => {
    try {
      await axios.post(
        `/api/v2/connections/request/send/${status}/${id}`,
        { withCredential: true }
      );
      // console.log(res);
      window.location.reload();
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  };

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm mb-20 mx-auto mt-5 border border-gray-700 rounded-none">
        <figure>
          <img src={user.photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title capitalize">
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.about}</p>
          <div className="card-actions justify-between mt-4 ">
            <button
              onClick={() => sentRequest("ignored", user._id)}
              className="btn bg-red-600  hover:bg-red-700"
            >
              Ignore
            </button>
            <button
              onClick={() => sentRequest("interested", user._id)}
              className="btn bg-blue-600 hover:bg-blue-800"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
