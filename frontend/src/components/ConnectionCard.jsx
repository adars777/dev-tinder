import React from "react";

const ConnectionCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, skills, age } = user;

  return (
    <div className="flex flex-col flex-wrap">
      <div className=" p-2 bg-base-100 w-105 shadow-sm m-2 border border-gray-700 rounded-none flex justify-between items-center">
        <div>
          <div>
            <img
              className="h-28 w-28 object-contain "
              src={photoUrl}
              alt="photo"
            />
          </div>
        </div>
        <div className="card-body">
          <div className="flex justify-between  items-center">
            <h2 className="card-title capitalize text-yellow-300 ">
              {firstName} {lastName}
            </h2>
            <h2 className=" text-yellow-300 items-center">{age}</h2>
          </div>
          <p className="text-blue-200">{about}</p>
          <div className="card-actions justify-end">
            <div className="text-gray-400">
              <span className="font-bold text-white">Skill Sets:</span>{" "}
              {skills.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
