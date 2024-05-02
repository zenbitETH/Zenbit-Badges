"use client";

// @ts-nocheck
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Profile = () => {
  const router = useRouter();
  const { address: connectedAddress } = useAccount();

  const { data: eventDetails } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "getAllStudentEventsWithAttestations",
    args: [connectedAddress],
  });

  // const { data: attestationData } = useScaffoldContractRead({
  //   contractName: "EASOnboarding",
  //   functionName: "getEventsCompleted",
  //   args: [connectedAddress],
  // });

  return (
    <div>
      <div className="my-12 grid items-center justify-center xl:m-10 md:grid-cols-2 2xl:grid-cols-3  ">
        {eventDetails?.map((doc, index) => {
          const src = Number(doc?.eventId) == 1 ? "/badge1.png" : "/badge2.png";
          // const src = "https://ipfs.io/ipfs/"+doc.imgUri;

          return (
            <div className="overflow-hidden rounded-md m-2 bg-gray-200/60 text-center p-6 relative" key={index}>
              <div className="absolute bottom-0 left-0 bg-zen rounded-tr-md rounded-bl-md px-4 py-1 font-mus text-sm xl:text-base">
                Evento
              </div>
              <div className="absolute bottom-0 right-0 bg-bit rounded-br-md rounded-tl-md px-4 py-1 text-white font-mus text-sm xl:text-base">
                Nv: 0
              </div>
              <div className="absolute bottom-0 right-0 left-0 text-center bg-white hover:bg-gray-500 rounded-t-md w-fit mx-auto px-4 py-1 hover:text-white text-sm xl:text-base">
                <a
                  className=""
                  target="_blank"
                  style={{ marginTop: "-1rem" }}
                  href={`${process.env.NEXT_PUBLIC_ATTESTATION_VIEW_URL}/${doc?.attestation}`}
                >
                  Ver en registro público (EAS)
                </a>
              </div>
              <div className="xl:text-2xl md:text-xl font-bold font-mus ">{doc?.eventName}</div>
              <Image src={src} alt="Profile" width={300} height={300} className="rounded-full mx-auto my-3" />
              <div className="text-xl italic pb-6">Mentor: habacuc.eth</div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          className="bg-zen text-black hover:text-white hover:bg-bit px-6 py-3 rounded-md font-mus text-lg"
          onClick={() => {
            router.push("/");
          }}
        >
          Regresar a Eventos
        </button>
      </div>
    </div>
  );
};

export default Profile;
