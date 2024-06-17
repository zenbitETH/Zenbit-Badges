"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { createEnsPublicClient } from "@ensdomains/ensjs";
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
// Import necessary components from ethers
import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet as EtherWallet } from "@ethersproject/wallet";
import { Wallet, hashMessage } from "ethers";
import { type Address, http } from "viem";
import { mainnet } from "viem/chains";
// import { ethers } from "ethers";
import { useAccount } from "wagmi";
import Loader from "~~/components/Loader";
import Modal from "~~/components/Modal";
import QuestionComponent from "~~/components/Question";
import { withAuth } from "~~/components/withAuth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import schemas from "~~/schema/index.json";
import type { Schemas } from "~~/types/quiz/index";
import { abi, deployedContract, gnosisContract } from "~~/utils/scaffold-eth/abi";
import { Answers } from "~~/utils/scaffold-eth/quiz";

const Quiz = () => {
  const { address: connectedAddress } = useAccount();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const provider = new JsonRpcProvider(process.env.JSON_RPC_PROVIDER || "https://optimism.drpc.org");
  const [data, setData] = useState({
    id: "",
    address: "",
    eventName: "",
    eventId: 0,
    eventDescription: "",
    mentorName: "",
    badgeUri: "",
    level: 0,
  });

  const [state, setState] = useState({
    answer: "",
    safeAddress: "",
  });

  async function grantAttestation(easContract: Contract, data: string, recipient: Address) {
    const schema = eventDetails?.[12];
    const expirationTime = 0;
    const revocable = true;
    try {
      const body = {
        schema,
        data: {
          recipient: recipient,
          data,
          expirationTime: expirationTime,
          revocable: revocable,
          refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
          value: 0n,
        },
      };
      const txResponse = await easContract.attest(body);
      const txReceipt = await txResponse.wait();
      return txReceipt;
    } catch (error) {
      console.error("Error granting attestation:", error);
      throw error;
    }
  }

  function getValue(value: string, type: boolean) {
    if (type) {
      return state[value as keyof typeof state];
    } else if (value.match("123")) {
      return "https://badges.zenbit.mx/event/" + eventId;
    } else {
      const valueMatch = value.match(/\[(\d+)\]/);
      const index = valueMatch !== null ? Number(valueMatch[1]) : 0;
      const val = eventDetails?.[index] || "";
      const returnValue = typeof val === "bigint" ? val.toString() : val;
      return returnValue;
    }
  }

  const privateKey = process.env.PRIVATE_KEY || "";
  const wallet = new EtherWallet(privateKey).connect(provider);

  // EAS Contract information
  const easContractAddress = abi.address; // Address of the EAS contract
  const easABI = abi.abi;
  const easOnboardingContract = new Contract(deployedContract.address, deployedContract.abi, wallet);
  // Connect to the EAS contract
  const easContract = new Contract(easContractAddress, easABI, wallet);

  const searchParams = useSearchParams();
  const { eventId = "" } = searchParams ? Object.fromEntries(searchParams) : {};
  if (!eventId) {
    router.push("/");
  }
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(`/api/userQuiz?id=${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY || "",
        },
      });
      const data = await response.json();

      setQuestions(data?.data || []);
    };
    fetchQuestions();
  }, [eventId]);

  const { data: userData } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "getEventsCompleted",
    args: [connectedAddress],
  });

  const client = createEnsPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const [open, setOpen] = useState(false);

  if (userData && userData[1].includes(BigInt(eventId)) && !open) {
    router.push("/");
  }

  const { data: eventDetails } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "events",
    args: [BigInt(eventId)],
  });

  if (eventDetails && eventDetails[2] > (userData?.[0] ?? 0)) {
    router.push("/");
  }

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "EASOnboarding",
    functionName: "getAttested",
    args: [1n, 1n, "0x", "0x"],
    onBlockConfirmation: async txnReceipt => {
      console.log("txnReceipt for getting the attestation ", txnReceipt);
      setLoading(true);
      await attachAttestation();
    },
  });

  const attachAttestation = async () => {
    try {
      if (connectedAddress && eventDetails && eventDetails[12] && schemas && easContract && easOnboardingContract) {
        let encodedString = "";
        let eventDetailsKey: string = eventDetails?.[12] as string;
        eventDetailsKey = eventDetailsKey.replace("0x", "");
        const eventDetailsSchema: Schemas = schemas[eventDetailsKey as keyof typeof schemas];
        for (const key in eventDetailsSchema) {
          if (Object.hasOwnProperty.call(eventDetailsSchema, key)) {
            encodedString += `${eventDetailsSchema[key].type} ${key},`;
          }
        }

        encodedString = encodedString.slice(0, -1);
        const schemaEncoder = new SchemaEncoder(encodedString);
        const dataToEncode = Object.entries(eventDetailsSchema).map(([key, { type, value, state }]) => ({
          name: key,
          value: getValue(value, state), // Getting the actual value from eventDetails
          type: type,
        }));
        if (dataToEncode.length > 0 && dataToEncode[4].value !== "") {
          const encodedData = schemaEncoder.encodeData(dataToEncode);
          const schemaUID = await grantAttestation(easContract, encodedData, connectedAddress);

          if (schemaUID && schemaUID?.events?.[0]?.args) {
            await addAttestation(
              easOnboardingContract,
              schemaUID?.events?.[0]?.args?.uid,
              connectedAddress,
              Number(eventDetails?.[1]),
            );
            setLoading(true);
          }
        }
      }
    } catch (error) {
      console.error("Error attaching attestation:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state && state.safeAddress) {
      async function callOnSubmit() {
        await onSubmit();
      }

      callOnSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const addAttestation = async (easOnboardingContract: any, id: string, address: string, eventId: number) => {
    try {
      const txResponse = await easOnboardingContract.addAttestation(id, address, eventId);
      if (txResponse) {
        setTimeout(() => {
          setOpen(true);
          setData({
            id: id,
            address: address,
            eventName: eventDetails?.[5] || "",
            eventId: eventId,
            eventDescription: eventDetails?.[6] || "",
            mentorName: eventDetails?.[7] || "",
            badgeUri: eventDetails?.[8] || "",
            level: Number(eventDetails?.[2]) || 0,
          });
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error granting attestation:", error);
      setLoading(false);
    }
  };

  const [answers, setAnswers] = useState<Answers>({});

  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  // const [selectedValueMentor, setSelectedValueMentor] = useState("");
  // const { address: connectedAddress } = useAccount();
  const handleOptionChange = (questionIndex: string, option: string) => {
    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  };

  useEffect(() => {
    const answeredQuestionsCount = Object.keys(answers).length;

    setAllQuestionsAnswered(answeredQuestionsCount == questions.length);
  }, [answers, questions]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (eventDetails?.[0] == 1) {
        const response = await fetch("/api/userQuiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.API_KEY || "",
          },
          body: JSON.stringify({ eventId: eventId, value: answers }),
        });
        const result = await response.json();
        if (result && result.data) {
          onSubmit();
        } else {
          setLoading(false);
          alert("Respuestas incorrectas, intenta de nuevo");
          router.push("/");
        }
      } else if (eventDetails?.[0] == 2) {
        const answer = Object.values(answers)[0];

        const result = await client.getAddressRecord({ name: answer });

        if (!result) {
          alert("No perteneces a esa DAO, por favor verifica");
          return;
        }

        const gnosisContractObj = new Contract(result?.value, gnosisContract.abi, provider);

        const txResponse = await gnosisContractObj.getOwners();
        if (txResponse) {
          if (!txResponse.includes(connectedAddress)) {
            alert("No perteneces a esa DAO, por favor verifica");
          } else {
            setState({ safeAddress: result?.value, answer: answer });
          }
          return;
        }
      } else if (eventDetails?.[0] == 3) {
        const answer = Object.values(answers)[0];

        const urlObj = new URL(answer);
        if (!urlObj) {
          alert("Please enter a valid URL");
          return;
        }

        const pathParts = urlObj.pathname.split("/");

        // Assuming the value we want is the first part of the path
        const value = pathParts[1];
        if (isAddress(value)) {
          setState({ safeAddress: value, answer: answer });
        } else {
          const result = await client.getAddressRecord({ name: value });

          if (!result) {
            alert("No perteneces a esa DAO, por favor verifica");
            return;
          }

          const gnosisContractObj = new Contract(result?.value, gnosisContract.abi, provider);

          const txResponse = await gnosisContractObj.getOwners();
          if (txResponse) {
            if (!txResponse.includes(connectedAddress)) {
              alert("No perteneces a esa DAO, por favor verifica");
            } else {
              setState({ safeAddress: result?.value, answer: answer });
            }
            return;
          }
        }
      }
    } catch (error) {
      alert("Please select a valid Safe address");
      console.log("Error in submitting the answers", error);
    }
  };

  function arrayify(msgHash: string): Uint8Array {
    return new Uint8Array(Buffer.from(msgHash.slice(2), "hex"));
  }

  const onSubmit = async () => {
    try {
      const msg = `0xf8604e13c79da26c9b862fb0cc410e1df7fd95bd017fed2e01506b14328e1287`;
      const msgHash = hashMessage(msg + connectedAddress);
      const privateKey = process.env.PRIVATE_KEY ?? ""; // Provide a default value for privateKey

      const wallet = new Wallet(privateKey);
      const signature = await wallet.signMessage(arrayify(msgHash));

      if (msgHash && signature) {
        setLoading(true);

        await writeAsync({
          args: [BigInt(eventId), eventDetails?.[2], msgHash as `0x${string}`, signature as `0x${string}`],
        });
      } else {
        setLoading(false);
        console.log("Error in signing the message");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // // Check for the access to the questions before rendering the component
  return loading ? (
    <Loader />
  ) : (
    <div className="min-w-xl  mx-auto flex justify-center p-6 mt-24 rounded-md text-center">
      {questions.length > 0 ? (
        <form onSubmit={handleSubmit} className="space-y-4 grid gap-5">
          {questions.map((question, index) => {
            return (
              <QuestionComponent
                key={index}
                question={question}
                questionIndex={index}
                handleOptionChange={handleOptionChange}
                answer={answers[(question as { _id: string })?._id]}
                eventData={eventDetails}
              />
            );
          })}

          {/* <div className="flex justify-center align-middle items-center">
              <div className="mr-10">Mentor</div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md"
                value={selectedValueMentor}
                onChange={e => setSelectedValueMentor(e.target.value)}
              >
               
                <option value="">Select correct answer</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div> */}
          <button
            type="submit"
            className={`${allQuestionsAnswered ? "bg-green-500 text-white" : "bg-red-300"} px-4 py-2 mx-auto block ${
              allQuestionsAnswered ? "" : "pointer-events-none"
            }`}
            disabled={!allQuestionsAnswered}
          >
            Verificar respuestas
          </button>
        </form>
      ) : (
        <p>No hay preguntas disponibles</p>
      )}

      <Modal
        isOpen={open}
        close={() => {
          setOpen(false);
          router.push("/");
        }}
        data={data}
      />
    </div>
  );
};
export default withAuth(Quiz);
