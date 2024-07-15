"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";
// import { useRouter } from "next/navigation";
import { withAuth } from "~~/components/withAuth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface FormData {
  question: string;
  options: string[]; // Change the type to array of strings
  answer: string;
  eventId: string;
}

interface Question extends FormData {
  eventId: string; // Unique identifier for each question
}

const CreateQuizForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    question: "",
    options: ["", "", ""], // Initialize with empty strings
    answer: "",
    eventId: "",
  });
  const { address: connectedAddress } = useAccount();

  const [editMode, setEditMode] = useState<string | null>(null);
  // const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [eventDBData, setEventDBData] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [selectEventType, setSelectedEventType] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "options") {
      const optionIndex = Number(e.target.getAttribute("data-index"));
      const updatedOptions = [...formData.options];
      updatedOptions[optionIndex] = value;
      setFormData(prevState => ({
        ...prevState,
        options: updatedOptions,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const getData = async () => {
    try {
      if (selectedEvent === "") return;
      const canAccess = checkQuizAccess();
      if (canAccess) {
        const response = await fetch(`/api/quiz?id=${selectedEvent}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.API_KEY || "",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data.data.quizData);
          setEventDBData(data.data.eventData);
        } else {
          console.error("Failed to fetch data");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvent]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (selectEventType == 1 && (!formData.question || !formData.answer || formData?.options?.length < 3)) {
        alert("Please enter question, options and answer");
        return;
      } else if (selectEventType == 2 && !formData.question) {
        alert("Please enter question");
        return;
      } else if (selectEventType == 4 && (!formData.question || !formData.answer)) {
        alert("Please enter a question with the answer");
        return;
      }

      // TODO: DEV_NOTE: We should refactor this piece of code to handle the new eventType (4) and the previous options
      if (selectEventType !== 4) {
        // this happens with event type 1, 2 or 3

        const correctAnswer = parseInt(formData.answer);

        const newQuestion: Question = {
          ...formData,
          answer: formData.options[correctAnswer - 1],
          eventId: selectedEvent,
        };

        if (editMode) {
          // const updatedQuestions = questions.map(q => (q.eventId === editMode ? newQuestion : q));
          // setQuestions(updatedQuestions);
          const canAccess = checkQuizAccess();
          if (canAccess) {
            const response = await fetch(`/api/quiz?id=${editMode}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY || "",
              },
              body: JSON.stringify(newQuestion),
            });

            if (response.ok) {
              getData();
              setFormData({
                question: "",
                options: ["", "", ""], // Reset options
                answer: "",
                eventId: selectedEvent,
              });
              setEditMode(null);
            } else {
              console.error("Failed to update question");
            }
          }
        } else {
          const canAccess = checkQuizAccess();
          if (canAccess) {
            const response = await fetch("/api/quiz", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY || "",
              },
              body: JSON.stringify(newQuestion),
            });

            if (response.ok) {
              getData();
              setFormData({
                question: "",
                options: ["", "", ""], // Reset options
                answer: "",
                eventId: selectedEvent,
              });
            } else {
              console.error("Failed to create question");
            }
          }
        }
      } else {
        // this happens for event type 4 (workshop)

        const newQuestion: Question = {
          ...formData,
          answer: formData.answer,
          eventId: selectedEvent,
        };

        if (editMode) {
          // const updatedQuestions = questions.map(q => (q.eventId === editMode ? newQuestion : q));
          // setQuestions(updatedQuestions);
          const canAccess = checkQuizAccess();
          if (canAccess) {
            const response = await fetch(`/api/quiz?id=${editMode}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY || "",
              },
              body: JSON.stringify(newQuestion),
            });

            if (response.ok) {
              getData();
              setFormData({
                question: "",
                options: ["", "", ""], // Reset options
                answer: "",
                eventId: selectedEvent,
              });
              setEditMode(null);
            } else {
              console.error("Failed to update question");
            }
          }
        } else {
          const canAccess = checkQuizAccess();
          if (canAccess) {
            const response = await fetch("/api/quiz", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY || "",
              },
              body: JSON.stringify(newQuestion),
            });

            if (response.ok) {
              getData();
              setFormData({
                question: "",
                options: ["", "", ""], // Reset options
                answer: "",
                eventId: selectedEvent,
              });
            } else {
              console.error("Failed to create question");
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data: eventData } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "getAllEvents",
  });

  const handleEdit = (id: string) => {
    const questionToEdit = data.find((q: { _id: string }) => q._id == id);
    if (!questionToEdit) return;

    setFormData({
      question: questionToEdit.question,
      options: [...questionToEdit.options],
      answer: eventDBData.eventType === "4" ? questionToEdit.answer : "",
      eventId: questionToEdit.eventId,
    });
    setEditMode(questionToEdit._id);
  };

  const handleDelete = async (id: string) => {
    try {
      const canAccess = checkQuizAccess();
      if (canAccess) {
        const response = await fetch(`/api/quiz?id=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.API_KEY || "",
          },
        });

        if (response.ok) {
          getData();
          setEditMode(null);
          setFormData({
            question: "",
            options: ["", "", ""],
            answer: "",
            eventId: "",
          });
        } else {
          console.error("Failed to delete question");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const checkQuizAccess = () => {
    const questionToEdit = eventData?.find((q: { mentorAddress: string }) => q.mentorAddress == connectedAddress);

    if (!questionToEdit) {
      alert("You are not authorized to create/edit questions for this event");
      throw new Error("You are not authorized to create quiz");
    } else return true;
  };

  return (
    <div className="my-28 mx-3">
      <div className="bg-gray-300 rounded-md p-5 mb-5 max-w-4xl mx-auto">
        <label htmlFor="Choose Event">Choose Event</label>
        <select
          name="events"
          id="eventId"
          onChange={e => {
            const selectedValue = e.target.value;
            const selectedEventData = eventData?.find((q: { eventId: bigint }) => q.eventId == BigInt(selectedValue));
            console.log({ selectedEventData });
            setSelectedEventType(selectedEventData?.typeOf || 0);
            setSelectedEvent(selectedValue);
          }}
        >
          <option value="">Please Select</option>
          {eventData &&
            eventData?.map((option, index) => (
              <option key={index} value={option.eventId.toString()}>
                <div className="justify-between">
                  <div>{option.eventName}</div>
                  <div> Level {String(option.level)}</div>
                  <div> Event Id {String(option.eventId)}</div>
                </div>
              </option>
            ))}
        </select>
      </div>
      {selectedEvent && (
        <div className="mx-auto">
          <form onSubmit={handleSubmit} className="rounded-md bg-gray-500 p-4 mb-4 text-white max-w-4xl mx-auto">
            <div className="mb-4">
              <label htmlFor="question" className="block mb-1">
                Question:
              </label>
              <input
                type="text"
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                className=""
                required
              />
            </div>
            {selectEventType == 1 && (
              <>
                <div className="flex mb-4">
                  {formData.options.map((option, index) => (
                    <div key={index} className="w-1/3 mr-2">
                      <label htmlFor={`option${index + 1}`} className="block mb-1">
                        Option {index + 1}:
                      </label>
                      <input
                        type="text"
                        id={`option${index + 1}`}
                        name="options"
                        data-index={index}
                        value={option}
                        onChange={handleChange}
                        className=""
                      />
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label htmlFor="answer" className="block mb-1">
                    Correct Answer:
                  </label>
                  <select id="answer" name="answer" value={formData.answer} onChange={handleChange} className="">
                    <option value="">Select correct answer</option>
                    <option value={1}>Option 1</option>
                    <option value={2}>Option 2</option>
                    <option value={3}>Option 3</option>
                  </select>
                </div>
              </>
            )}
            {selectEventType == 4 && (
              <>
                <div className="mb-4">
                  <label htmlFor="answer" className="block mb-1">
                    Fixed Answer:
                  </label>
                  <input
                    type="text"
                    id={`answer`}
                    name="answer"
                    value={formData.answer}
                    onChange={handleChange}
                    className=""
                  />
                </div>
              </>
            )}
            <div className="text-center w-full">
              <button type="submit" className="bg-zen">
                {editMode ? "Update Question" : "Add Question"}
              </button>
            </div>
          </form>

          {data.length > 0 && (
            <div className="my-6 text-center">
              <div className="text-2xl mb-2 font-mus ">Event Questions:</div>
              <ul className="grid md:grid-cols-2 2xl:grid-cols-3 gap-3">
                {data.map(
                  (
                    {
                      question,
                      options,
                      answer,
                      _id,
                    }: { eventId: string; question: string; options: string[]; answer: string; _id: string },
                    index: number,
                  ) => (
                    <li key={index} className="p-6 rounded-md bg-gray-200/60 relative text-left">
                      <p>
                        <strong className="font-mus">Question {index + 1} :</strong> <br />
                        {question}
                      </p>
                      {selectEventType == 1 && (
                        <>
                          <div className="grid gap-1 ">
                            <strong className="font-mus">Options:</strong>
                            {options?.map((option, key) => {
                              return (
                                <span key={key}>
                                  {key + 1}: {option}
                                  {"            "}
                                </span>
                              );
                            })}
                          </div>
                          <p>
                            <strong className="font-mus">Answer:</strong> {answer}
                          </p>
                        </>
                      )}

                      <div
                        onClick={() => handleEdit(_id)}
                        className=" absolute top-0 left-0 bg-zen hover:bg-bit rounded-br-md rounded-tl-md px-4 py-1 font-mus cursor-pointer hover:text-white"
                      >
                        Edit
                      </div>
                      <div
                        onClick={() => handleDelete(_id)}
                        className="absolute top-0 right-0 bg-red-500 hover:bg-white hover:text-red-500 rounded-tr-md rounded-bl-md px-4 py-1 text-white font-mus cursor-pointer"
                      >
                        Delete
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default withAuth(CreateQuizForm);
