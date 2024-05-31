"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { formatUnits, parseUnits } from "viem";
import { useScaffoldContractRead, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

export type TableDataType = {
  eventId: string;
  eventName: string;
  studentAddress: string;
  methodName: string;
  mentorAddress: string;
  timestamp: string;
}[];

export default function EventDetailPage() {
  const params = useParams<{ eventId: string }>();
  const [tableDataIsLoading, setTableDataIsLoading] = useState(false);
  const [tableData, setTableData] = useState<TableDataType>([]);

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

  useEffect(() => {
    setTableDataIsLoading(true);
    if (params?.eventId && eventCreatedEvent?.length && attestationAddedEvent?.length) {
      const tableDataArray: TableDataType = [];
      let mentorAddress = "";
      eventCreatedEvent.forEach(event => {
        mentorAddress = event.args.mentorAddress as string;
        tableDataArray.push({
          eventId: params?.eventId as string,
          eventName: event.args.eventName as string,
          studentAddress: "- -",
          methodName: event.log.eventName,
          mentorAddress: mentorAddress,
          timestamp: formatUnits(event.block.timestamp, 0),
        });
      });
      attestationAddedEvent.forEach(event => {
        tableDataArray.push({
          eventId: params?.eventId as string,
          eventName: event.log.eventName,
          studentAddress: event.args.studentAddress as string,
          methodName: event.log.eventName,
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
    <>
      <div className="text-center">
        {eventDetails ? (
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold font-mus">{String(eventDetails[5])}</h1>
        ) : null}
      </div>
      <section className="flex flex-row mb-4">
        <div className="mx-auto bg-bit p-10 rounded-xl">
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
        <div className=" md:max-w-5xl lg:max-w-5xl pr-20 ">
          {eventDetails ? (
            <div
              className="text-justify overflow-auto h-sm:text-sm h-md:text-base h-lg:text-lg bg-bit rounded-xl px-4 pb-2 "
              dangerouslySetInnerHTML={{ __html: eventDetails[6] }}
            ></div>
          ) : null}
        </div>
      </section>
      <div className="overflow-x-auto px-20 h-72 max-h-72 overflow-y-auto ">
        <table className="table table-pin-rows ">
          {/* head */}
          <thead className="text-lg ">
            <tr>
              <th>#</th>
              <th>Event Id</th>
              <th>Student Address</th>
              <th>Action (method name)</th>
              <th>Mentor</th>
              <th>Timestamp</th>
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
                  <td>{data.eventId}</td>
                  <td>{data.studentAddress}</td>
                  <td>{data.methodName}</td>
                  <td>{data.mentorAddress}</td>
                  <td>{new Date(Number(data.timestamp) * 1000).toUTCString()}</td>
                </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
