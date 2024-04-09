"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import moment from "moment";
// import { useRouter } from "next/navigation";
import { withAuth } from "~~/components/withAuth";

interface FormData {
  name: string;
  desc: string;
  level: number;
  timeStamp: number;
  mentorName: string;
}

const CreateQuizForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    desc: "", // Initialize with empty strings
    level: 0,
    timeStamp: 0,
    mentorName: "",
  });

  //   const router = useRouter();
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
    const isValidDate = moment(formData.timeStamp).isValid();
    if (!isValidDate) {
      return;
    }
    // const correctAnswer = parseInt(formData.answer);

    // const newQuestion: Question = {
    //   ...formData,
    //   answer: formData.options[correctAnswer - 1],
    //   eventId: Date.now().toString(),
    // };

    console.log(formData);

    setFormData({
      name: "",
      desc: "", // Reset options
      mentorName: "",
      level: 0,
      timeStamp: 0,
    });
  };

  //   const exportQuiz = async (questions: Question[]) => {
  //     try {
  //       const response = await fetch("/api/quiz", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(questions),
  //       });

  //       if (response.ok) {
  //         router.push("/");
  //       } else {
  //         console.error("Failed to export quiz");
  //       }
  //     } catch (error) {
  //       console.error("Error exporting quiz", error);
  //     }
  //   };

  return (
    <div className="m-10">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="border border-gray-300 rounded p-4 mb-4">
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
              className="w-full border border-gray-300 rounded px-2 py-1"
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
              className="w-full border border-gray-300 rounded px-2 py-1"
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
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
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
              className="w-full border border-gray-300 rounded px-2 py-1"
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
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Event
          </button>
        </form>

        {/* {questions.length > 0 && (
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Created Questions:</h2>
            <ul>
              {questions.map(({ eventId, question, options, answer }, index) => (
                <li key={eventId} className="mb-4 p-2 border">
                  <p>
                    <strong>Question {index + 1} :</strong> {question}
                  </p>
                  <p>
                    <strong>Options:</strong>
                    {options?.map((option, key) => {
                      return (
                        <span key={key}>
                          {key + 1}:{option}
                          {"            "}
                        </span>
                      );
                    })}
                  </p>
                  <p>
                    <strong>Answer:</strong> {answer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default withAuth(CreateQuizForm);
