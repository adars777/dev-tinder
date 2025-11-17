import React from "react";
import { MdMessage } from "react-icons/md";
import { Link } from "react-router";

const ConnectionCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, about, skills, age } = user;

  // console.log('this is user id', _id);

  return (
    <div className="flex border-2 w-125 p-3">
      {/* part-1 */}
      <div className="image">
        <img className="h-28 w-28 object-contain " src={photoUrl} alt="photo" />{" "}
      </div>

      {/* part-2 */}
      <div className="details flex ">
        <div className="card-body">
          <div className="flex flex-row justify-between w-[85%] items-center">
            <h2 className="card-title capitalize text-yellow-300 ">
              {firstName} {lastName}
            </h2>
            <h2 className=" text-yellow-300 items-center">{age}</h2>
          </div>
          <p className="text-blue-200">{about}</p>
          <div className="card-actions ">
            <div className="text-gray-400">
              <span className="font-bold text-white">Skill Sets:</span>{" "}
              {skills.join(", ")}
            </div>
          </div>
        </div>
      </div>

      {/* part 3 message box */}
      <div className="message flex flex-col items-center justify-center cursor-pointer">
        <Link to={"/chat/" + _id}>
          {" "}
          <MdMessage />
        </Link>
      </div>
    </div>
  );
};

export default ConnectionCard;
