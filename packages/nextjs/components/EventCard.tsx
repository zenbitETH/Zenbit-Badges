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
      className={` ${
        userData && userData?.[1].includes(eventDetails?.eventId) ? "bg-gray-200/60" : "bg-gray-500/60"
      } rounded-md shadow-md m-2 relative`}
      onClick={() => {
        if (
          !userData?.[1].includes(eventDetails?.eventId) &&
          connectedAddress &&
          eventDetails.level <= (userData?.[0] ?? 0)
        ) {
          router.push(`/quiz?eventId=${eventDetails.eventId.toString()}`);
        }
      }}
    >
      <div className="absolute top-0 left-0 bg-zen rounded-br-md rounded-tl-md px-4 py-1 font-mus text-xl">
        Event {eventDetails.level.toString()}
      </div>
      <div className="absolute top-0 right-0 bg-bit rounded-tr-md rounded-bl-md px-4 py-1 text-white font-mus text-xl">
        Lv: {eventDetails.level.toString()}
      </div>
      <div className="absolute bottom-0 right-0 left-0 bg-gray-400 text-lg py-1 rounded-b-md text-white font-cha text-center">
        Open until: {Number(eventDetails.closingTimestamp)}
      </div>
      <div className=" grid items-center text-center">
        <div className="grid items-center h-full py-12">
          <div className="rounded-full bg-red-500 h-32 w-32 m-auto"></div>
        </div>
      </div>
      <div className="col-span-3 grid pb-10 font-cha text-center">
        <div className="text-2xl font-bold font-mus">{String(eventDetails.eventName)}</div>
        <div className="text-xl italic">Mentor: {String(eventDetails.mentorName)}</div>
        <div className="">{String(eventDetails.eventDescription)}</div>
      </div>
    </div>
  );
};
