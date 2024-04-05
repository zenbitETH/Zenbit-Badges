import React from "react";
import Image from "next/image";

const Profile = () => {
  return (
    <div className="flex items-center justify-center mt-40">
      <div className="max-w-lg overflow-hidden border border-gray-300 rounded-lg">
        <div className="px-6 py-6">
          <div className="flex justify-center items-center">
            <div className="flex flex-row items-center justify-between">
              <div className="mr-4">
                <Image src="/thumbnail.jpg" alt="Profile" width={150} height={150} className="rounded-full" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-semibold mt-4">John Doe</h1>
                <p className="text-gray-600">@johndoe</p>
              </div>
            </div>
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
    </div>
  );
};

export default Profile;
