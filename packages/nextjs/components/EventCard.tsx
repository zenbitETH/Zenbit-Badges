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
      className={`border ${
        userData && userData?.[1].includes(eventDetails?.eventId) ? "border-green-500" : "border-gray-300"
      } rounded-lg shadow-md p-6 max-w-xl m-3`}
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
      <div>
        <div>
          <strong>Expiry:</strong> {Number(eventDetails.closingTimestamp)}
        </div>
        <div>
          <strong>Title:</strong> {String(eventDetails.eventName)}
        </div>
        <div>
          <strong>Description:</strong> {String(eventDetails.eventDescription)}
        </div>
        <div>
          <strong>Mentor:</strong> {String(eventDetails.mentorName)}
        </div>
        <div>
          <strong>Level:</strong> {eventDetails.level.toString()}
        </div>
      </div>
    </div>
  );
};
