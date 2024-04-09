"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Profile = () => {
  const router = useRouter();
  const { address: connectedAddress } = useAccount();

  const { data: eventDetails } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "events",
    args: [1n],
  });

  // const { data: attestationData } = useScaffoldContractRead({
  //   contractName: "EASOnboarding",
  //   functionName: "attestationProfile",
  //   args: [connectedAddress],
  // });
  return (
    <div>
      <div className="flex items-center justify-center mt-40">
        {eventDetails && eventDetails[0] != 0n && (
          <div className="max-w-lg overflow-hidden border border-gray-300 rounded-lg">
            <div className="px-6 py-6">
              <div className="flex justify-center items-center">
                <div className="flex flex-row items-center justify-between">
                  <div className="mr-4">
                    <Image src="/image.png" alt="Profile" width={150} height={150} className="rounded-full" />
                  </div>
                  <div className="ml-4">
                    <h1 className="text-2xl font-semibold mt-4"></h1>
                    <p className="">{eventDetails[4]}</p>
                    <p className="">{eventDetails[5]}</p>
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

                <p></p>
                <p className="text-sm">{connectedAddress}</p>

                <p className="text-sm">Mentor</p>
                {/* //TODO  Add the mentor name from the attestation granted */}
              </div>
            </div>
          </div>
        )}
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
  );
};

export default Profile;
