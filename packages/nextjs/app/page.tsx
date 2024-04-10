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
  const { data: events } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "getAllEvents",
  });

  const { data: userData } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "studentEventMap",
    args: [connectedAddress, 1n],
  });

  return (
    <>
      <div className="flex items-center justify-center pt-10">
        {events
          ? events?.map(eventDetails => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div
                  className={`border ${
                    userData ? "border-green-500" : userData == false ? "border-red-300" : "border-gray-300"
                  } rounded-lg shadow-md p-6 max-w-xl`}
                  onClick={() => {
                    if (!userData && connectedAddress) {
                      router.push(`/quiz?eventId=${eventDetails.eventId.toString()}`);
                    }
                  }}
                >
                  <div>
                    <div>
                      <strong>Expiry:</strong> {Number(eventDetails.closingTimestamp)}
                    </div>
                    <div>
                      <strong>Title:</strong> {String(eventDetails.eventName)}
                    </div>
                    <div>
                      <strong>Description:</strong> {String(eventDetails.eventDescription)}
                    </div>
                    <div>
                      <strong>Mentor:</strong> {String(eventDetails.mentorName)}
                    </div>
                    <div>
                      <strong>Level:</strong> {eventDetails.level.toString()}
                    </div>
                  </div>
                </div>
              );
            })
          : "No events available"}
      </div>
    </>
  );
};

export default Home;
