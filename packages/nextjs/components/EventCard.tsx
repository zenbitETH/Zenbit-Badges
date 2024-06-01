import Image from "next/image";
import Link from "next/link";
import moment from "moment";

export const EventCard = ({
  eventDetails,
  userData,
  connectedAddress,
  router,
}: {
  eventDetails: any;
  userData: any;
  connectedAddress: any;
  router: any;
}) => {
  return (
    <div
      className={`py-10 sm:p-10 ${
        userData && userData?.[1].includes(eventDetails?.eventId)
          ? "bg-bit/100 text-white hover:cursor-not-allowed"
          : Number(eventDetails.closingTimestamp) * 1000 < Date.now()
          ? "bg-gray-500 text-white hover:bg-gray-500 hover:cursor-not-allowed"
          : "bg-gray-200/60"
      } rounded-md shadow-md relative cursor-pointer h-full`}
    >
      <div className="absolute top-0 left-0 bg-zen text-black rounded-br-md rounded-tl-md px-4 py-1 font-mus">
        Evento {eventDetails.eventId.toString()}{" "}
        {!(userData && userData?.[1].includes(eventDetails?.eventId)) &&
          Number(eventDetails.closingTimestamp) * 1000 < Date.now() &&
          "/ Finalizado"}
        {userData && userData?.[1].includes(eventDetails?.eventId) && "/ 🎖️"}
      </div>
      <div className="absolute top-0 right-0 bg-bit rounded-tr-md rounded-bl-md px-4 py-1 text-white font-mus text-xl">
        Nv: {eventDetails.level.toString()}
      </div>
      <div className="absolute bottom-0 right-0 left-0 bg-gray-500 text-base  py-1 rounded-b-md text-white font-cha text-center">
        Disponible hasta: {moment(Number(eventDetails.closingTimestamp) * 1000).format("HH:mm:ss DD/MM/YYYY")}
      </div>
      <div className="flex flex-col pt-8 justify-center items-center ">
        <span className="flex 2xl:text-lg font-bold font-mus w-96 h-16 items-center justify-center">
          {String(eventDetails.eventName)}
        </span>
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
      <div className="col-span-3 pb-10 font-cha text-center">
        <div className=" italic pb-3">Mentor: {String(eventDetails.mentorName)}</div>
      </div>
      <div className="flex flex-row w-full justify-evenly">
        <Link href={`/event/${eventDetails.eventId}`} className="border-2 rounded-full border-white">
          <button>Ver detalle</button>
        </Link>
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
    </div>
  );
};
