"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import moment from "moment";
// import { useRouter } from "next/navigation";
import { withAuth } from "~~/components/withAuth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface FormData {
  name: string;
  desc: string;
  level: number;
  timeStamp: number;
  mentorName: string;
  type: number;
}
// TODO need to read the events fro t he contract.
// Cannot create the contract from the front end

const CreateQuizForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    desc: "", // Initialize with empty strings
    level: 0,
    timeStamp: 0,
    mentorName: "",
    type: 1,
  });

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "EASOnboarding",
    functionName: "createEvent",
    args: [1n, 1n, 1, "", "", ""],
    onBlockConfirmation: async txnReceipt => {
      console.log("txnReceipt for the create Event ", txnReceipt);
      // attachAttestation();
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.desc ||
      !formData.mentorName ||
      formData.level == undefined ||
      !formData.timeStamp
    ) {
      return;
    }
    const isValidDate = moment(formData.timeStamp).valueOf();
    const currentTimestamp = moment().valueOf();
    if (isValidDate < currentTimestamp) {
      return;
    }
    writeAsync({
      args: [
        BigInt(formData.timeStamp),
        BigInt(formData.level),
        formData.type,
        formData.name,
        formData.desc,
        formData.mentorName,
      ],
    });

    setFormData({
      name: "",
      desc: "",
      mentorName: "",
      level: 0,
      timeStamp: 0,
      type: 1,
    });
  };

  const { data: eventData } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "getAllEvents",
  });

  return (
    <div className="my-28 w-full mx-auto">
      <form onSubmit={handleSubmit} className="rounded-md bg-gray-300/80 p-4 mb-4 max-w-4xl md:mx-auto mx-3">
        <div className="text-2xl mb-2 font-mus text-center">New Event:</div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Event Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className=""
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="desc" className="block mb-1">
            Event Description:
          </label>
          <input
            type="text"
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="p-3 pb-5 text-black w-full mx-auto rounded-md placeholder:italic h-32 bg-white"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="level" className="block mb-1">
            Level:
          </label>
          <input
            type="number"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className=""
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="level" className="block mb-1">
            Type of Questions:
          </label>
          <select id="answer" name="type" value={formData.type} onChange={handleChange} className="" required>
            <option value={1}>3-Option Quiz </option>
            <option value={2}>Written Answers</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="timeStamp" className="block mb-1">
            Closing TimeStamp:
          </label>
          <input
            type="number"
            id="timeStamp"
            name="timeStamp"
            value={formData.timeStamp}
            onChange={handleChange}
            className=""
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mentorName" className="block mb-1">
            Mentor Name:
          </label>
          <input
            type="text"
            id="mentorName"
            name="mentorName"
            value={formData.mentorName}
            onChange={handleChange}
            className=""
            required
          />
        </div>
        <div className="text-center w-full">
          <button type="submit" className="bg-zen">
            Add Event
          </button>
        </div>
      </form>

      {eventData && eventData.length > 0 && (
        <div className="text-center mx-3 my-10">
          <div className="text-2xl mb-2 font-mus">Created Events:</div>
          <ul className="grid md:grid-cols-2 2xl:grid-cols-3">
            {eventData.map(
              ({ eventId, eventName, typeOf, eventDescription, mentorName, level, closingTimestamp }, index) => (
                <li key={eventId} className="mb-4 p-6 py-9 rounded-md bg-gray-200/60 relative">
                  <div className="absolute top-0 left-0 bg-zen rounded-br-md rounded-tl-md px-4 py-1 font-mus">
                    Event {index + 1}
                  </div>
                  <div className="xl:text-2xl font-bold font-mus">{eventName}</div>
                  <div className="py-3 text-xl font-bold">{typeOf == 1 ? "3-Option Quiz" : "Written Answers"} </div>
                  <div className="text-base xl:text-lg text-justify">{eventDescription}</div>
                  <div className="xl:text-xl italic py-3">Mentor:{mentorName}</div>
                  <div className="absolute top-0 right-0 bg-bit rounded-tr-md rounded-bl-md px-4 py-1 text-white font-mus">
                    Lv:{String(level)}
                  </div>

                  <div className="absolute bottom-0 right-0 left-0 bg-gray-500 text-base xl:text-lg py-1 rounded-b-md text-white font-cha text-center">
                    Open until: {moment(Number(closingTimestamp) * 1000).format("HH:mm:ss DD/MM/YYYY")}
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default withAuth(CreateQuizForm);
