"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { EventCard } from "~~/components/EventCard";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

// import { Address } from "~~/components/scaffold-eth";

const Home = () => {
  const { address: connectedAddress } = useAccount();
  const searchParams = useSearchParams();

  const eventId = searchParams?.get("eventId");

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
    <div className="2xl:my-18 xl:my-18 my-24">
      <div className="grid items-center justify-center gap-3 mx-3 md:grid-cols-2 2xl:grid-cols-3 text-center">
        {events
          ? events
              ?.filter(event =>
                eventId === null || eventId === undefined
                  ? true
                  : eventId === formatUnits(event.eventId, 0)
                  ? true
                  : false,
              )
              .map((eventDetails, index) => (
                <EventCard
                  key={index}
                  eventDetails={eventDetails}
                  userData={userData}
                  connectedAddress={connectedAddress}
                  router={router}
                />
              ))
          : "Cargando eventos disponibles..."}
      </div>
    </div>
  );
};

export default Home;
