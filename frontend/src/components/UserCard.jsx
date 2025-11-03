import React from "react";
 
const UserCard = ({user}) => {

    
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm mb-20 mx-auto mt-5 border border-gray-700 rounded-none">
        <figure>
          <img
            src={user.photoUrl}
            alt="photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title capitalize">{user.firstName} {user.lastName}</h2>
          <p>
           {user.about}
          </p>
          <div className="card-actions justify-between mt-4 ">
            <button className="btn bg-red-600  hover:bg-red-700">Ignore</button>
            <button className="btn bg-blue-600 hover:bg-blue-800">Interested</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
