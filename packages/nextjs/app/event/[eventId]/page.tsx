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
    <div className="flex flex-col gap-6 mt-20 sm:mt-16">
      <div className="text-center">
        {eventDetails ? (
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold font-mus">{String(eventDetails[5])}</h1>
        ) : null}
      </div>
      <section className="flex items-center gap-4 sm:gap-0 flex-col justify-center lg:flex-col xl:flex-row mb-4 sm:mb-10">
        <div className="flex flex-col mx-auto gap-2">
          <div className="mx-auto bg-bit rounded-xl">
            {eventDetails ? (
              <div className="flex flex-row w-full justify-between  ">
                <div className=" top-0 left-0 bg-zen text-black rounded-br-md px-4 py-1 font-mus rounded-tl-xl">
                  Evento {eventDetails[0].toString()}{" "}
                  {!(userData && userData?.[1].includes(parseUnits(String(eventDetails[0]), 0))) &&
                    Number(eventDetails[3]) * 1000 < Date.now() &&
                    "/ Finalizado"}
                  {userData && userData?.[1].includes(parseUnits(String(eventDetails[0]), 0)) && "/ 🎖️"}
                </div>
                <div className=" top-0 right-0 bg-zen rounded-tr-xl rounded-bl-md px-4 py-1 text-white font-mus text-xl">
                  Nv: {eventDetails[2].toString()}
                </div>
              </div>
            ) : null}
            {eventDetails ? (
              <Image
                alt="Badge"
                width={150}
                height={150}
                className="rounded-full w-full h-auto p-6"
                src={`https://ipfs.io/ipfs/${String(eventDetails[8])}`}
              />
            ) : null}
          </div>
          <div className="flex flex-col sm:gap-1">
            <span className="flex flex-row w-full gap-4">
              Mentor:
              {eventDetails && isAddress(eventDetails[9]) ? <Address address={eventDetails[9]} format="long" /> : null}
            </span>

            <span className="flex flex-row w-full gap-4">
              Closing: {eventDetails ? moment(Number(eventDetails[3]) * 1000).format(" DD/MM/YYYY HH:mm:ss") : null}
            </span>
          </div>
        </div>
        <div className="flex max-w-sm sm:max-w-2xl lg:max-w-5xl lg:px-10 xl:pr-20 ">
          {eventDetails ? (
            <div
              className="text-justify  overflow-auto h-sm:text-sm h-md:text-base h-lg:text-lg bg-bit rounded-xl px-4 pb-2 "
              dangerouslySetInnerHTML={{ __html: eventDetails[6] }}
            ></div>
          ) : null}
        </div>
      </section>
      <div className="sm:max-w-sm md:max-w-2xl max-w-xs mx-auto lg:min-w-full overflow-x-auto  lg:px-20 h-80 max-h-80 overflow-y-auto ">
        <table className="table table-pin-rows ">
          {/* head */}
          <thead className="text-lg ">
            <tr>
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
                        className="hover:underline text-blue-600 hover:text-blue-700"
                      >
                        <span className="flex flex-row gap-2">
                          {data.methodName}
                          <Image src="/external-link.svg" width={15} height={15} alt="Open external Link" />
                        </span>
                      </a>
                    ) : (
                      data.methodName
                    )}
                  </td>
                  <td>
                    {isAddress(data.mentorAddress) ? <Address address={data.mentorAddress} format="long" /> : null}
                  </td>
                  <td>
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
