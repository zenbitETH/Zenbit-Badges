import React from "react";

const Profile = () => {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-6">
        <div className="text-center">
          <img className="h-24 w-24 rounded-full mx-auto" src="user-avatar.jpg" alt="User Avatar" />
          <h1 className="text-2xl font-semibold mt-4">John Doe</h1>
          <p className="text-gray-600">@johndoe</p>
        </div>
        <div className="mt-6">
          <p className="text-base text-gray-700">Email: johndoe@example.com</p>
          <p className="text-base text-gray-700">Location: New York City</p>
          <p className="text-base text-gray-700">Joined: January 1, 2023</p>
        </div>
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md">Follow</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
