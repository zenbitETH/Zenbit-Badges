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
    functionName: "getAllStudentEventsWithAttestations",
    args: [connectedAddress],
  });

  console.log(eventDetails);

  // const { data: attestationData } = useScaffoldContractRead({
  //   contractName: "EASOnboarding",
  //   functionName: "getEventsCompleted",
  //   args: [connectedAddress],
  // });

  return (
    <div>
      <div className="flex items-center justify-center mt-40">
        {eventDetails?.map((data, index) => {
          return (
            <div className="flex" key={index}>
              <div className="max-w-lg overflow-hidden border border-gray-300 rounded-lg m-2">
                <div className="px-6 py-6">
                  <div className="flex justify-center items-center">
                    <div className="flex flex-row items-center justify-between">
                      <div className="mr-4">
                        <Image src="/image.png" alt="Profile" width={150} height={150} className="rounded-full" />
                      </div>

                      <div>
                        <div>Event Name:{data?.eventName}</div>
                        <div>Event Description:{data?.eventDescription}</div>
                        <div>Mentor Name:{data?.mentorName}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-base">Address : {data?.attestation}</p>
                    <div className="m-3">
                      <p className="text-base">Onboarding Attestation Granted!</p>
                      <a
                        className="text-xs"
                        style={{ marginTop: "-1rem" }}
                        target="_blank"
                        href={`${process.env.NEXT_PUBLIC_ATTESTATION_VIEW_URL}/${data.attestation}`}
                      >
                        See on EAS explorer
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
