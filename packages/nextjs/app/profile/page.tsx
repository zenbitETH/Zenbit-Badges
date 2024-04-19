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

  // const { data: attestationData } = useScaffoldContractRead({
  //   contractName: "EASOnboarding",
  //   functionName: "getEventsCompleted",
  //   args: [connectedAddress],
  // });

  return (
    <div>
      <div className="my-12 grid items-center justify-center xl:m-10 md:grid-cols-3  ">
        {eventDetails?.map((doc, index) => {
          return (
            <div className="overflow-hidden rounded-md m-2 bg-gray-200/60 " key={index}>
              <div className="px-6 py-6">
                <div className="flex justify-center items-center">
                  <div className="flex flex-row items-center justify-between">
                    <div className="mr-4">
                      <Image src="/badge1.png" alt="Profile" width={300} height={300} className="rounded-full" />
                    </div>

                    <div>
                      <div>Event Name:{doc?.eventName}</div>
                      <div>Event Description:{doc?.eventDescription}</div>
                      <div>Mentor Name:{doc?.mentorName}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center hover:text-bit">
                  <div className="m-3 cursor-pointer">
                    <a
                      className="text-xl"
                      style={{ marginTop: "-1rem" }}
                      href={`${process.env.NEXT_PUBLIC_ATTESTATION_VIEW_URL}/${doc?.attestation}`}
                    >
                      See on EAS explorer
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          className="bg-zen text-black hover:text-white hover:bg-bit px-6 py-3 rounded-md font-mus text-lg"
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
