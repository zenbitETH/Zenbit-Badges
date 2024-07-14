"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import moment from "moment";
import { formatUnits } from "viem";
import { withAuth } from "~~/components/withAuth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import schemas from "~~/schema/index.json";

interface FormData {
  name: string;
  desc: string;
  level: number;
  timeStamp: number;
  mentorName: string;
  type: string;
  schemaId: "0x";
  eventurl: string;
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
    type: "0",
    schemaId: "0x",
    eventurl: "",
  });
  const [createEventEntryInDatabase, setCreateEventEntryInDatabase] = useState(false);

  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const [schemaIds] = useState<string[]>(Object.keys(schemas));

  const [selectedImage, setSelectedImage] = useState<{
    imageFile: File | null;
    previewURL: string | null;
  } | null>(null);

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "EASOnboarding",
    functionName: "createEvent",
    args: [1n, 1n, 1, "", "", "", "", "0x"],
    onBlockConfirmation: async txnReceipt => {
      console.log("txnReceipt", txnReceipt);

      setCreateEventEntryInDatabase(true);
    },
  });

  const {
    data: eventData,
    isLoading: getAllEventsIsLoading,
    isFetching: getAllEventsIsFetching,
    isRefetching: getAllEventsIsRefetching,
  } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "getAllEvents",
  });

  useEffect(() => {
    async function postCreateEventEntry(newEevent: any) {
      console.log("in postCreateEventEntry ", { newEevent });
      const response = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY || "",
        },
        body: JSON.stringify(newEevent),
      });
      if (response.ok) {
        setShowSuccessToast(true);
        setFormData({
          name: "",
          desc: "",
          mentorName: "",
          level: 0,
          timeStamp: 0,
          type: "0",
          schemaId: "0x",
          eventurl: "",
        });
        setSelectedImage({
          imageFile: null,
          previewURL: null,
        });
        setCreateEventEntryInDatabase(false);
        const timeout = setTimeout(() => {
          setShowSuccessToast(false);
        }, 4000);
        () => clearTimeout(timeout);
      } else {
        alert("Error creating event entry.");
        setCreateEventEntryInDatabase(false);
      }
    }

    if (
      createEventEntryInDatabase &&
      !getAllEventsIsLoading &&
      !getAllEventsIsFetching &&
      !getAllEventsIsRefetching &&
      eventData
    ) {
      const newEevent = {
        eventId: formatUnits(eventData[eventData.length - 1].eventId, 0),
        eventType: formData.type,
        eventURL: formData.eventurl,
      };
      postCreateEventEntry(newEevent);
    }
  }, [
    createEventEntryInDatabase,
    getAllEventsIsLoading,
    getAllEventsIsFetching,
    getAllEventsIsRefetching,
    eventData,
    formData.type,
    formData.eventurl,
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.desc ||
      !formData.mentorName ||
      formData.level == undefined ||
      !formData.timeStamp ||
      !formData.schemaId
    ) {
      return;
    }
    const timeStampValue = moment(formData.timeStamp).unix();

    // const isValidDate = moment(timeStampValue).valueOf();
    const currentTimestamp = moment().valueOf();

    if (timeStampValue > currentTimestamp) {
      return;
    }

    if (!selectedImage || !selectedImage.imageFile) {
      return;
    }

    const form = new FormData();
    form.append("file", selectedImage.imageFile);

    const responseData = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      headers: { Authorization: "Bearer " + process.env.NEXT_PUBLIC_PINATA_JWT, "Content-Type": "multipart/form-data" },
      data: form,
    });

    if (responseData?.data?.IpfsHash) {
      // dependiendo del eventType, escribir en el contrato el schemaId y questionsType correspondientes

      const schemaIdToSave = schemaIds[3];
      let questionType = "0";

      if (formData.type === "5") {
        // when workshop, question type is quiz (id 1)
        questionType = "1";
      } else {
        questionType = formData.type;
      }

      if (questionType !== "0") {
        await writeAsync({
          args: [
            BigInt(timeStampValue),
            BigInt(formData.level),
            Number(questionType),
            formData.name,
            formData.desc,
            formData.mentorName,
            responseData.data.IpfsHash,
            `0x${schemaIdToSave}`, // Fix: Ensure formData.schemaId is of type '`0x${string}`'
          ],
        });
      } else {
        alert("asdsad");
      }
    }
    // client.storeBlob((selectedImage as any).imageFile).then(cid => {
    //   console.log("cid", cid);
    //   writeAsync({
    //     args: [
    //       BigInt(formData.timeStamp),
    //       BigInt(formData.level),
    //       formData.type,
    //       formData.name,
    //       formData.desc,
    //       formData.mentorName,
    //       cid,
    //       `0x${formData.schemaId}`, // Fix: Ensure formData.schemaId is of type '`0x${string}`'
    //     ],
    //   });
    // });
  };

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];

      setSelectedImage({
        imageFile: img,
        previewURL: URL.createObjectURL(img),
      });
    }
  };
  console.log({ formData });
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
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="p-3 pb-5 text-black w-full mx-auto rounded-md placeholder-italic h-32 bg-white"
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
          <label htmlFor="type" className="block mb-1">
            Event Type:
          </label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} className="" required>
            {/* Onboarding (quiz)
            DAO formation (safe+ens)
            DAO incubation (mirror link) */}
            <option value={1}>Onboarding</option>
            <option value={2}>DAO formation </option>
            <option value={3}>DAO incubation</option>
            <option value={4}>Live Event</option>
            <option value={5}>Workshop</option>
          </select>
        </div>

        {formData.type === "4" || formData.type === "5" ? (
          <div className="mb-4">
            <label htmlFor="eventurl" className="block mb-1">
              Event URL:
            </label>
            <input
              type="text"
              id="eventurl"
              name="eventurl"
              value={formData.eventurl}
              onChange={handleChange}
              className=""
              required
            />
          </div>
        ) : null}

        <div className="mb-4">
          <label htmlFor="timeStamp" className="block mb-1">
            Attestation Time Limit:
          </label>
          <input
            type="datetime-local"
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

        <div className="mb-4">
          <label htmlFor="placeImage" className="block mb-1">
            PlaceImage
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
          />
        </div>
        {selectedImage && selectedImage.previewURL && (
          <div className="mb-4">
            <p className="block white text-sm font-bold mb-2">Preview</p>
            <Image src={selectedImage.previewURL} alt="Preview" width={200} height={200} />
          </div>
        )}
        <div className="text-center w-full">
          <button type="submit" className="bg-zen">
            Add Event
          </button>
        </div>
      </form>

      {eventData && eventData.length > 0 && (
        <div className="text-center mx-3 my-10">
          <div className="text-2xl mb-2 font-mus">Created Events:</div>
          <ul className="grid md:grid-cols-2 2xl:grid-cols-3 gap-3">
            {eventData.map(
              ({ eventId, eventName, typeOf, eventDescription, mentorName, level, closingTimestamp }, index) => (
                <li key={eventId} className="mb-4 p-6 py-9 rounded-md bg-gray-200/60 relative">
                  <div className="absolute top-0 left-0 bg-zen rounded-br-md rounded-tl-md px-4 py-1 font-mus">
                    Event {index + 1}
                  </div>
                  <div className="xl:text-2xl font-bold font-mus">{eventName}</div>
                  <div className="py-3 text-xl font-bold">{typeOf == 1 ? "3-Option Quiz" : "Written Answers"} </div>
                  <div
                    className="text-base xl:text-lg text-justify"
                    dangerouslySetInnerHTML={{ __html: eventDescription }}
                  ></div>
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
      {showSuccessToast ? (
        <div className="toast">
          <div className="alert alert-success">
            <span>New event created.</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default withAuth(CreateQuizForm);
