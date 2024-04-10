"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Wallet, hashMessage } from "ethers";
import { useAccount } from "wagmi";
import QuestionComponent from "~~/components/Question";
import { withAuth } from "~~/components/withAuth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
// import Question from "~/components/Question";
import { Answers } from "~~/utils/scaffold-eth/quiz";

const easContractAddress = "0x4200000000000000000000000000000000000021";
const schemaUID = "0xe3990a5b917495816f40d1c85a5e0ec5ad3dd66e40b129edb0f0b3a381790b7b";
const eas = new EAS(easContractAddress);

const Quiz = () => {
  const { address: connectedAddress } = useAccount();
  const router = useRouter();

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
        },
      });
      const data = await response.json();

      setQuestions(data?.data || []);
    };
    fetchQuestions();
  }, [eventId]);

  const { data: userData } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "studentEventMap",
    args: [connectedAddress, 1n],
  });

  if (userData) {
    router.push("/");
  }

  const { data: eventDetails } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "events",
    args: [1n],
  });

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "EASOnboarding",
    functionName: "getAttested",
    args: [1n, 1n, "0x", "0x"],
    onBlockConfirmation: async txnReceipt => {
      console.log("txnReceipt for getting the attestation ", txnReceipt);
      attachAttestation();
    },
  });

  const { writeAsync: addAttestation } = useScaffoldContractWrite({
    contractName: "EASOnboarding",
    functionName: "addAttestation",
    args: ["0x", "0x"],
    onBlockConfirmation: txnReceipt => {
      console.log("txnReceipt for the Adding attestation after the EAS", txnReceipt);
      router.push("/profile");
    },
  });

  const attachAttestation = async () => {
    if (connectedAddress && eventDetails) {
      const wallet = new Wallet(""); //TODO  Not able to send the signer
      await eas.connect(wallet);
      // Initialize SchemaEncoder with the schema string
      const schemaEncoder = new SchemaEncoder(
        "uint256 Event_ID,string Event_Name,string Description,string Mentor_Name",
      );
      const encodedData = schemaEncoder.encodeData([
        { name: "Event_ID", value: eventDetails[0], type: "uint256" },
        { name: "Event_Name", value: eventDetails[3], type: "string" },
        { name: "Description", value: eventDetails[4], type: "string" },
        { name: "Mentor_Name", value: eventDetails[5], type: "string" },
      ]);
      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: "0x0000000000000000000000000000000000000000",
          expirationTime: 0n,
          revocable: true, // Be aware that if your schema is not revocable, this MUST be false
          data: encodedData,
        },
      });
      const newAttestationUID = await tx.wait();

      if (newAttestationUID) {
        // set the attestation to the chain
        addAttestation({
          args: [newAttestationUID as `0x${string}`, connectedAddress as `0x${string}`],
        });
      }
    }
  };

  const [answers, setAnswers] = useState<Answers>({});

  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  const [selectedValueMentor, setSelectedValueMentor] = useState("");
  // const { address: connectedAddress } = useAccount();
  const handleOptionChange = (questionIndex: number, option: string) => {
    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  };

  useEffect(() => {
    const answeredQuestionsCount = Object.keys(answers).length;
    setAllQuestionsAnswered(answeredQuestionsCount === questions.length);
  }, [answers]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const score = questions.reduce((total, question, index) => {
      if (answers[index] === (question as any)?.answer) {
        return total + 1;
      }
      return total;
    }, 0);
    console.log("score", score, questions);
    if (score == questions?.length) {
      onSubmit();
    } else {
      router.push("/");
    }
  };
  function arrayify(msgHash: string): Uint8Array {
    return new Uint8Array(Buffer.from(msgHash.slice(2), "hex"));
  }
  const onSubmit = async () => {
    const msg = `0xf8604e13c79da26c9b862fb0cc410e1df7fd95bd017fed2e01506b14328e1287`;
    const msgHash = hashMessage(msg + connectedAddress);
    const privateKey = ""; // TODO add the private key
    const wallet = new Wallet(privateKey);
    const signature = await wallet.signMessage(arrayify(msgHash));

    if (msgHash && signature) {
      writeAsync({
        args: [1n, 1n, msgHash as `0x${string}`, signature as `0x${string}`],
      });
    }
  };

  // // Check for the access to the questions before rendering the component
  return (
    <div className="min-w-xl max-w-xl mx-auto flex justify-center m-10">
      {questions.length > 0 ? (
        <div className="min-w-xl max-w-xl rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {questions.map((question, index) => {
              return (
                <QuestionComponent
                  key={index}
                  question={question}
                  questionIndex={index}
                  handleOptionChange={handleOptionChange}
                  answer={answers[index]}
                />
              );
            })}

            <div className="flex justify-center align-middle items-center">
              <div className="mr-10">Mentor</div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md"
                value={selectedValueMentor}
                onChange={e => setSelectedValueMentor(e.target.value)}
              >
                {/* //TODO add the names of the mentor in the value */}
                <option value="">Select correct answer</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <button
              type="submit"
              className={`${
                allQuestionsAnswered && selectedValueMentor != ""
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-600"
              } px-4 py-2 rounded mx-auto block ${allQuestionsAnswered ? "" : "pointer-events-none"}`}
              disabled={!(allQuestionsAnswered && selectedValueMentor != "")}
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <p>No questions available</p>
      )}
    </div>
  );
};
export default withAuth(Quiz);
