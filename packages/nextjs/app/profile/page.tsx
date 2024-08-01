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
    <>
      <div className="mt-0 xl:mt-20 border-2 border-blue-300">
        <h1>Configuracion de la cuenta</h1>
        <div className="flex flex-row gap-4 w-full justify-evenly border border-red-500 ">
          <div className="flex flex-col gap-6 border-2 border-orange-400 ">
            <div className="flex gap-2">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">
                  Nombre:
                </label>
                <input type="text" className="outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">
                  Email:
                </label>
                <input type="text" className="outline" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">
                  Organización:
                </label>
                <input type="text" className="outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">
                  Wallet address asociada:
                </label>
                <input type="text" className="outline" />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-28 h-28 bg-green-700" />
          </div>
        </div>
        <button
          className="bg-zen text-black hover:text-white hover:bg-bit rounded-md font-mus text-lg"
          onClick={() => {
            router.push("/");
          }}
        >
          Guardar cambios
        </button>
      </div>
      <div className="border-2 border-blue-300">
        <h1>Badges Obtenidos</h1>
        <div className="grid items-center justify-center xl:m-10 md:grid-cols-2 2xl:grid-cols-3 ">
          {eventDetails?.[0]?.map((doc, index) => {
            return (
              <div className="overflow-hidden rounded-md m-2 bg-gray-200/60 text-center p-6 relative" key={index}>
                <div className="absolute bottom-0 left-0 bg-zen rounded-tr-md rounded-bl-md px-4 py-1 font-mus text-sm xl:text-base">
                  Evento {doc?.eventId.toString()}
                </div>
                <div className="absolute bottom-0 right-0 bg-bit rounded-br-md rounded-tl-md px-4 py-1 text-white font-mus text-sm xl:text-base">
                  Nv: {doc?.level.toString()}
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
                <Image
                  src={"https://ipfs.io/ipfs/" + eventDetails?.[1]?.[index]}
                  alt="Profile"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto my-3"
                />
                <div className="text-xl italic pb-6">Mentor: {doc.mentorName}</div>
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
    </>
  );
};

export default Profile;
