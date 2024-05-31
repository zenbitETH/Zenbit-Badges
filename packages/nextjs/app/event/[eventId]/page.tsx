"use client";

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
    <div>
      EventDetailPage <br />
    </div>
  );
}
