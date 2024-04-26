import Image from "next/image";
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
  const src = Number(eventDetails?.eventId) == 1 ? "/badge1.png" : "/badge2.png";
  return (
    <button
      className={` ${
        userData && userData?.[1].includes(eventDetails?.eventId)
          ? "bg-bit/100 text-white hover:cursor-not-allowed"
          : Number(eventDetails.closingTimestamp) * 1000 < Date.now()
          ? "bg-gray-500"
          : "bg-gray-200/60"
      } rounded-md shadow-md m-2 relative cursor-pointer h-full`}
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
      <div className="absolute top-0 left-0 bg-zen rounded-br-md rounded-tl-md px-4 py-1 font-mus">
        Evento {eventDetails.eventId.toString()}{" "}
        {!(userData && userData?.[1].includes(eventDetails?.eventId)) &&
          Number(eventDetails.closingTimestamp) * 1000 < Date.now() &&
          "Expired"}
        {userData && userData?.[1].includes(eventDetails?.eventId) && "Claimed"}
      </div>
      <div className="absolute top-0 right-0 bg-bit rounded-tr-md rounded-bl-md px-4 py-1 text-white font-mus text-xl">
        Nv: {eventDetails.level.toString()}
      </div>
      <div className="absolute bottom-0 right-0 left-0 bg-gray-500 text-base xl:text-lg py-1 rounded-b-md text-white font-cha text-center">
        Disponible hasta: {moment(Number(eventDetails.closingTimestamp) * 1000).format("HH:mm:ss DD/MM/YYYY")}
      </div>
      <div className=" grid items-center text-center">
        <div className="grid items-center h-full pt-12">
          <div className="xl:text-2xl font-bold font-mus">{String(eventDetails.eventName)}</div>
          <div className="mx-auto rounded-full">
            <Image alt="Badge" width={150} height={150} src={src} className=" rounded-full my-3" />
          </div>
        </div>
      </div>
      <div className="col-span-3 grid pb-10 font-cha text-center">
        <div className="xl:text-xl italic pb-3">Mentor: {String(eventDetails.mentorName)}</div>
        <div className="text-base xl:text-lg text-justify">{String(eventDetails.eventDescription)}</div>
      </div>
    </button>
  );
};
