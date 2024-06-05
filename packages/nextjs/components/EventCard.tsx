import Image from "next/image";
import Link from "next/link";
import { CountdownMonths } from "./CountdownMonths";
import moment from "moment";

export const EventCard = ({
  eventDetails,
  userData,
}: // connectedAddress,
// router,
{
  eventDetails: any;
  userData: any;
  connectedAddress: any;
  router: any;
}) => {
  return (
    <div
      className={`py-10 sm:p-10 ${
        userData && userData?.[1].includes(eventDetails?.eventId)
          ? "badge-granted"
          : Number(eventDetails.closingTimestamp) * 1000 < Date.now()
          ? "finalized-event"
          : "bg-gray-200/60"
      } rounded-md shadow-md relative cursor-pointer h-full group`}
    >
      <span className="text-xl absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-md backdrop-blur-md">
        {!(userData && userData?.[1].includes(eventDetails?.eventId)) &&
          Number(eventDetails.closingTimestamp) * 1000 < Date.now() &&
          "Evento Finalizado"}
        {userData && userData?.[1].includes(eventDetails?.eventId) && "¡Obtuviste esta Badge! 🎖️"}
      </span>
      {userData &&
        !userData?.[1].includes(eventDetails?.eventId) &&
        !(Number(eventDetails.closingTimestamp) * 1000 < Date.now()) && (
          <Link
            href={`/quiz?eventId=${eventDetails?.eventId}`}
            className="text-xl text-white absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-md backdrop-blur-md"
          >
            ¡Reclama esta Badge! 🎖️
          </Link>
        )}
      <div className="absolute top-0 left-0 bg-zen text-black rounded-br-md rounded-tl-md px-4 py-1 font-mus text-sm">
        Evento {eventDetails.eventId.toString()} <span className="">/ Nv: {eventDetails.level.toString()}</span>
      </div>
      <div className="absolute top-0 right-0 text-black bg-white/70 hover:bg-zen rounded-tr-md rounded-bl-md px-4 py-1 hover:text-white font-mus text-sm">
        <Link href={`/event/${eventDetails.eventId}`} className="">
          Ver detalle
        </Link>
      </div>
      <div className="absolute bottom-0 right-0 left-0 bg-gray-500/60 text-base  py-1 rounded-b-md text-white font-cha text-center">
        {!(Number(eventDetails.closingTimestamp) * 1000 < Date.now()) ? (
          <CountdownMonths timeToExpiration={Number(eventDetails.closingTimestamp) * 1000} />
        ) : (
          <span>Evento Finalizado</span>
        )}
      </div>
      <div className="flex flex-col justify-center items-center ">
        <span className="flex 2xl:text-lg font-bold font-mus px-5 items-center justify-center">
          {String(eventDetails.eventName)}
        </span>
        <span> {moment(Number(eventDetails.closingTimestamp) * 1000).format("DD/MM/YYYY")}</span>
        <div className="mx-auto rounded-full">
          <Image
            alt="Badge"
            width={150}
            height={150}
            className="rounded-full my-3"
            src={`https://ipfs.io/ipfs/${String(eventDetails?.badgeUri)}`}
          />
        </div>
      </div>
      <div className="col-span-3  font-cha text-center">
        <div className=" italic pb-3">Mentor: {String(eventDetails.mentorName)}</div>
      </div>
      {/*
      <div className="flex flex-row w-full justify-evenly">
        <button
          className={`${
            userData && userData?.[1].includes(eventDetails?.eventId)
              ? "bg-bit/100 text-white hover:cursor-not-allowed"
              : Number(eventDetails.closingTimestamp) * 1000 < Date.now()
              ? "bg-gray-500 text-white hover:bg-gray-500 hover:cursor-not-allowed"
              : "bg-gray-200/60"
          } rounded-md shadow-md relative cursor-pointer`}
          onClick={() => {
            if (
              !userData?.[1].includes(eventDetails?.eventId) &&
              connectedAddress &&
              eventDetails.level <= (userData?.[0] ?? 0)
            ) {
              router.push(`/quiz?eventId=${eventDetails.eventId.toString()}`);
            }
          }}
          disabled={
            !(
              !userData?.[1].includes(eventDetails?.eventId) &&
              connectedAddress &&
              eventDetails.level <= (userData?.[0] ?? 0)
            ) || Number(eventDetails.closingTimestamp) * 1000 < Date.now()
          }
        >
          Action Button
        </button>
      </div>
      */}
    </div>
  );
};
