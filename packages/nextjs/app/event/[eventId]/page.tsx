"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import moment from "moment";
import { formatUnits, isAddress, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

export type TableDataType = {
  eventName: string;
  studentAddress: string;
  attestation: string;
  methodName: string;
  mentorAddress: string;
  timestamp: string;
}[];

export default function EventDetailPage() {
  const params = useParams<{ eventId: string }>();
  const [tableDataIsLoading, setTableDataIsLoading] = useState(false);
  const [tableData, setTableData] = useState<TableDataType>([]);

  const { address: connectedAddress } = useAccount();

  const { data: eventDetails } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "events",
    args: [parseUnits(params?.eventId as string, 0)],
    enabled: params?.eventId !== undefined,
  });

  const { data: eventCreatedEvent } = useScaffoldEventHistory({
    contractName: "EASOnboarding",
    eventName: "EventCreated",
    fromBlock: 119579120n,
    filters: { eventId: parseUnits(params?.eventId as string, 0) },
    blockData: true,
  });

  const { data: attestationAddedEvent } = useScaffoldEventHistory({
    contractName: "EASOnboarding",
    eventName: "AttestationAdded",
    fromBlock: 119579120n,
    filters: { eventId: parseUnits(params?.eventId as string, 0) },
    blockData: true,
  });

  const { data: userData } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "getEventsCompleted",
    args: [connectedAddress],
  });

  useEffect(() => {
    setTableDataIsLoading(true);
    if (params?.eventId && eventCreatedEvent?.length && attestationAddedEvent?.length) {
      const tableDataArray: TableDataType = [];
      let mentorAddress = "";
      eventCreatedEvent.forEach(event => {
        mentorAddress = event.args.mentorAddress as string;
        tableDataArray.push({
          eventName: event.args.eventName as string,
          studentAddress: "- -",
          attestation: "",
          methodName: "Evento Creado",
          mentorAddress: mentorAddress,
          timestamp: formatUnits(event.block.timestamp, 0),
        });
      });
      attestationAddedEvent.forEach(event => {
        tableDataArray.push({
          eventName: event.log.eventName,
          studentAddress: event.args.studentAddress as string,
          attestation: event.args.attestation as string,
          methodName: "Badge Otorgada",
          mentorAddress: mentorAddress,
          timestamp: formatUnits(event.block.timestamp, 0),
        });
      });

      setTableData(
        // @ts-expect-error type error expected but the value will exists
        tableDataArray.sort((a, b) => {
          if (a.timestamp && b.timestamp && Number(a.timestamp) > Number(b.timestamp)) return -1;

          if (a.timestamp && b.timestamp && Number(a.timestamp) < Number(b.timestamp)) return 1;
        }),
      );
      setTableDataIsLoading(false);
    }
  }, [eventCreatedEvent, attestationAddedEvent, params?.eventId]);

  return (
    <div className="my-20 mx-3">
      <section className="text-center mx-auto rounded-md  relative bg-gradient-to-b bg-gray-200/60 to-gray-500/20 mb-5 p-3 max-w-3xl">
        {eventDetails ? (
          <div className="text-sm">
            <div className="absolute top-0 left-0 bg-zen text-black rounded-br-md px-4 py-1 font-mus rounded-tl-xl text-sm">
              Evento {eventDetails[0].toString()} / Nv: {eventDetails[2].toString()}
            </div>
            <div className="absolute top-0 right-0 bg-bit rounded-tr-xl rounded-bl-md px-4 py-1 text-white font-mus">
              {!(userData && userData?.[1].includes(parseUnits(String(eventDetails[0]), 0))) &&
                Number(eventDetails[3]) * 1000 < Date.now() &&
                "No tienes esta Badge :("}
              {userData && userData?.[1].includes(parseUnits(String(eventDetails[0]), 0)) && "Tienes esta Badge 🎖️"}
            </div>
          </div>
        ) : null}
        {eventDetails ? (
          <Image
            alt="Badge"
            width={250}
            height={250}
            className="rounded-full p-6 mx-auto"
            src={`https://ipfs.io/ipfs/${String(eventDetails[8])}`}
          />
        ) : null}
        {eventDetails ? (
          <h1 id="Event Name" className="text-xl md:text-2xl lg:text-4xl font-bold font-mus">
            {String(eventDetails[5])}
          </h1>
        ) : null}
        <div className="grid grid-cols-2 mx-auto items-center  text-sm max-w-xs ">
          <div id="Event Date" className=" mx-auto bg-zen/70 rounded-md px-4 py-1 ">
            <div className="font-bold">Fecha:‏ ‎</div>
            {eventDetails ? moment(Number(eventDetails[3]) * 1000).format(" DD/MM/YYYY") : null}
          </div>
          <div className=" items-center bg-bit/70 rounded-md mx-auto px-4 py-1 ">
            <span className="font-bold">Mentor:‏ ‎</span>
            {eventDetails && isAddress(eventDetails[9]) ? (
              <Address address={eventDetails[9]} format="long" size="sm" />
            ) : null}
          </div>
        </div>
        {eventDetails ? (
          <div
            id="Event Description"
            className="text-justify h-sm:text-sm h-md:text-base h-lg:text-lg rounded-xl  "
            dangerouslySetInnerHTML={{ __html: eventDetails[6] }}
          ></div>
        ) : null}
      </section>
      <div className="text-xl font-mus text-center my-3">Badges otorgadas en este evento</div>
      <div className="max-w-xs mx-auto sm:max-w-xl  lg:max-w-6xl overflow-x-auto   bg-black/40 rounded-md text-white">
        <table className="table  ">
          {/* head */}
          <thead className="text-lg ">
            <tr className="bg-bit">
              <th>#</th>
              <th>Accion</th>
              <th>Address del Mentor</th>
              <th>Address del Receptor</th>
              <th>Fecha y hora</th>
            </tr>
          </thead>
          <tbody>
            {tableDataIsLoading ? (
              <tr>
                <td colSpan={6} className="text-center">
                  <span className="loading loading-dots loading-lg"></span>
                </td>
              </tr>
            ) : tableData.length ? (
              tableData.map((data, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>
                    {data.attestation !== "" ? (
                      <a
                        href={`https://optimism.easscan.org/attestation/view/${data.attestation}`}
                        target="_blank"
                        className="hover:underline
                        hover:text-zen"
                      >
                        <span className="flex flex-row gap-2 group">
                          <Image
                            src="/eas.png"
                            width={25}
                            height={25}
                            alt="Open external Link"
                            className="rounded-full bg-white p-1"
                          />
                          {data.methodName}
                        </span>
                      </a>
                    ) : (
                      data.methodName
                    )}
                  </td>
                  <td
                    className="hover:underline
                        hover:text-zen"
                  >
                    {isAddress(data.mentorAddress) ? <Address address={data.mentorAddress} format="long" /> : null}
                  </td>
                  <td
                    className="hover:underline
                        hover:text-zen"
                  >
                    {isAddress(data.studentAddress) ? <Address address={data.studentAddress} format="long" /> : null}
                  </td>
                  <td>{moment(Number(data.timestamp) * 1000).format(" DD/MM/YYYY HH:mm:ss")}</td>
                </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
