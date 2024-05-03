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
    <div className="2xl:mt-18 xl:mt-14 mt-24">
      <div className="grid items-center justify-center gap-3 mx-3 md:grid-cols-2 2xl:grid-cols-3 text-center">
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
          : "Cargando eventos disponibles..."}
      </div>
    </div>
  );
};

export default Home;
