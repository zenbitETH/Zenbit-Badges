"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, hashMessage } from "ethers";
import { useAccount } from "wagmi";
import QuestionComponent from "~~/components/Question";
import { withAuth } from "~~/components/withAuth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import questions from "~~/quiz/quizzes.json";
// import Question from "~/components/Question";
import { Answers } from "~~/utils/scaffold-eth/quiz";

const Quiz = () => {
  const { address: connectedAddress } = useAccount();
  const router = useRouter();
  const { data: userData } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "studentEventMap",
    args: [connectedAddress, 1n],
  });

  if (userData) {
    router.push("/");
  }

  
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "EASOnboarding",
    functionName: "getAttested",
    args: [1n, 1n, "0x", "0x"],
    onBlockConfirmation: txnReceipt => {
      console.log("txnReceipt", txnReceipt);
      // router.push("/dashboard");
    },
  });
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<string | null>(null);
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
    if (score == questions.length) {
      onSubmit();
    }
    else
    {
      router.push("/");
    }
   
  };
  function arrayify(msgHash: string): Uint8Array {
    return new Uint8Array(Buffer.from(msgHash.slice(2), "hex"));
  }
  const onSubmit = async () => {
    const msg = `0xf8604e13c79da26c9b862fb0cc410e1df7fd95bd017fed2e01506b14328e1287`;
    const msgHash = hashMessage(msg + connectedAddress);
    const privateKey = process.env.PRIVATE_KEY || "";
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
            {questions.map((question, index) => (
              <QuestionComponent
                key={index}
                question={question}
                questionIndex={index}
                handleOptionChange={handleOptionChange}
                answer={answers[index]}
              />
            ))}

            <div className="flex justify-center align-middle items-center">
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
          {result && <p className="text-center mt-4">{result}</p>}
        </div>
      ) : (
        <p>No questions available</p>
      )}
    </div>
  );
};
export default withAuth(Quiz);
