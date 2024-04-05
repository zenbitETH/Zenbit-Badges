"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center mt-40">
      <div className="max-w-lg overflow-hidden border border-gray-300 rounded-lg">
        <div className="px-6 py-6">
          <div className="flex justify-center items-center">
            <div className="flex flex-row items-center justify-between">
              <div className="mr-4">
                <Image src="/image.png" alt="Profile" width={150} height={150} className="rounded-full" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-semibold mt-4">Name</h1>
                <p className="">Description</p>
                <p className="">Date</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <div className="m-3">
              <p className="text-base">Onboarding Attestation Granted!</p>
              <p className="text-xs" style={{ marginTop: "-1rem" }}>
                See on EAS explorer
              </p>
            </div>
            <p className="text-sm">Joined: January 1, 2023</p>
            <p></p>
            <p className="text-sm">Participants address</p>
            <p className="text-sm"> University Address</p>
            <p className="text-sm">Mentor</p>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-md"
              onClick={() => {
                router.push("/");
              }}
            >
              Return To Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
