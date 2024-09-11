"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { EventCard } from "~~/components/EventCard";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface EventsData {
  typeOf: number;
  eventId: bigint;
  level: bigint;
  closingTimestamp: bigint;
  attendeeCount: bigint;
  eventName: string;
  eventDescription: string;
  mentorName: string;
  badgeUri: string;
  mentorAddress: string;
  attendees: readonly string[];
  isActive: boolean;
  overrideClosingTimestamp: boolean;
  schemaUID: `0x${string}`;
  startTimestamp: number | undefined;
}
[];

const Home = () => {
  const { address: connectedAddress } = useAccount();
  const searchParams = useSearchParams();

  const [eventsData, setEventsData] = useState<EventsData[]>([]);

  const eventId = searchParams?.get("eventId");

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

  useEffect(() => {
    async function fetchEventsFromDatabase() {
      const response = await fetch("/api/events");
      const { data } = await response.json();

      if (events) {
        const newEventsData = events?.map(eventInfo => {
          let newEventInfo: any = eventInfo;
          data.forEach((eventDBData: any) => {
            if (eventDBData.eventId === formatUnits(eventInfo.eventId, 0)) {
              newEventInfo = {
                ...eventInfo,
                startTimestamp: eventDBData.eventDate,
              };
            }
          });
          return newEventInfo;
        });
        setEventsData(newEventsData);
      }
    }
    fetchEventsFromDatabase();
  }, [events]);

  return (
    <div className="2xl:my-18 xl:my-18 my-24 mx-3">
      <div className="grid items-center justify-center gap-3 md:grid-cols-2 2xl:grid-cols-4 text-center">
        {eventsData
          ? eventsData
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
              .reverse()
          : "Cargando eventos disponibles..."}
      </div>
    </div>
  );
};

export default Home;
