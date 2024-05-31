"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { parseUnits } from "viem";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export default function EventDetailPage() {
  const params = useParams<{ eventId: string }>();

  const { data: eventDetails } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "events",
    args: [parseUnits(params?.eventId as string, 0)],
    enabled: params?.eventId !== undefined,
  });

  console.log({ eventDetails });

  return (
    <>
      <div className="text-center">
        {eventDetails ? (
          <h1 className="text-xl md:text-2xl lg:text-5xl font-bold font-mus">{String(eventDetails[5])}</h1>
        ) : null}
      </div>
      <section className="flex flex-row ">
        <div className="mx-auto ">
          {eventDetails ? (
            <Image
              alt="Badge"
              width={150}
              height={150}
              className="rounded-full w-full h-auto my-3"
              src={`https://ipfs.io/ipfs/${String(eventDetails[8])}`}
            />
          ) : null}
        </div>
        <div className=" md:max-w-5xl lg:max-w-5xl px-10">
          {eventDetails ? (
            <div
              className="text-justify overflow-auto h-sm:text-sm h-md:text-base h-lg:text-lg"
              dangerouslySetInnerHTML={{ __html: eventDetails[6] }}
            ></div>
          ) : null}
        </div>
      </section>
    </>
  );
}
