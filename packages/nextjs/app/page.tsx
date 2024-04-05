"use client";

import React from "react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

// import { Address } from "~~/components/scaffold-eth";

const Home = () => {
  const { address: connectedAddress } = useAccount();

  // const { data: readScaffold } = useScaffoldContractRead({
  //   contractName: "EASOnboarding",
  //   functionName: "eventIdCounter",
  // });
  const router = useRouter();
  const { data: eventDetails } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "events",
    args: [1n],
  });

  const { data: userData } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "studentEventMap",
    args: [connectedAddress, 1n],
  });

  return (
    <>
      <div className="flex items-center justify-center pt-10">
        {eventDetails && (
          <div
            className={`border ${
              userData ? "border-green-500" : userData == false ? "border-red-300" : "border-gray-300"
            } rounded-lg shadow-md p-6 max-w-xl`}
            onClick={() => {
              if (!userData && connectedAddress) {
                router.push("/quiz");
              }
            }}
          >
            <div>
              <div>
                <strong>Expiry:</strong> {Number(eventDetails[1])}
              </div>
              <div>
                <strong>Title:</strong> {String(eventDetails[3])}
              </div>
              <div>
                <strong>Description:</strong> {String(eventDetails[4])}
              </div>
              <div>
                <strong>Mentor:</strong> {String(eventDetails[5])}
              </div>
              <div>
                <strong>Address:</strong> {eventDetails[6]}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
