import React, { useEffect } from "react";
import api from "../utils/constant";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeRequests, setRequests } from "../utils/requestSlice";
import { useNavigate } from "react-router";

const Requests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      await api.post(
        "/api/v2/connections/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequests(_id));
      window.location.reload();

      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequests = async () => {
    if (requests) return;

    try {
      const res = await api.get("/api/v2/profile/requests/received", {
        withCredentials: true,
      });
      // console.log(res.data.data);
      dispatch(setRequests(res.data.data));
      navigate("/requests");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h1 className=" items-center text-center font-bold text-3xl underline mt-20">
        Connection Requests
      </h1>
      {requests && requests.length > 0 ? (
        <ul>
          {requests.map((request) => (
            <li key={request._id} className="border w-64 m-5 p-2">
              <div className="flex items-center mb-4 gap-4">
                <div>
                  <img
                    className="w-15 h-15"
                    src={request.fromUserId.photoUrl}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-xl">
                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                  </p>
                  <div className="mb-2 flex justify-evenly gap-2 items-end">
                    <button
                      className="bg-blue-500 px-1 rounded-sm"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-700 px-1 rounded-sm"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No connection requests found.</p>
      )}
    </div>
  );
};

export default Requests;
