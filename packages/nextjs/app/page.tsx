"use client";

import React from "react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { useAccount } from "wagmi";
import { EventCard } from "~~/components/EventCard";
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
    functionName: "getEventsCompleted",
    args: [connectedAddress],
  });

  return (
    <div className="my-12">
      <div className="xl:col-span-10 grid items-center justify-center xl:m-10 md:grid-cols-3 text-black overflow-auto scrollbar-hide place-content-start">
        {events
          ? events?.map((eventDetails, index) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <EventCard
                  key={index}
                  eventDetails={eventDetails}
                  userData={userData}
                  connectedAddress={connectedAddress}
                  router={router}
                />
              );
            })
          : "No events available"}
      </div>
    </div>
  );
};

export default Home;
