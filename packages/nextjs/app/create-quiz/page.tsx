"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  correctAnswer: string;
}

interface Question {
  question: string;
  options: [string, string, string];
  answer: string;
}

const CreateQuizForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    correctAnswer: "",
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  //   const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.question || !formData.option1 || !formData.option2 || !formData.option3 || !formData.correctAnswer) {
      alert("Please fill in all fields");
      return;
    }

    const { question, option1, option2, option3, correctAnswer } = formData;

    const quizItem: Question = {
      question,
      options: [option1, option2, option3],
      answer: correctAnswer,
    };

    setQuestions([...questions, quizItem]);

    // Clear the form fields
    setFormData({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      correctAnswer: "",
    });
    // setIsFormValid(false);
  };

  //   const handleAddQuestion = () => {
  //     setIsFormValid(true);
  //   };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="border border-gray-300 rounded p-4 m-4">
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
            className="w-full border border-gray-300 rounded px-2 py-1"
            required
          />
        </div>
        <div className="flex mb-4">
          <div className="w-1/3 mr-2">
            <label htmlFor="option1" className="block mb-1">
              Option 1:
            </label>
            <input
              type="text"
              id="option1"
              name="option1"
              value={formData.option1}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
          </div>
          <div className="w-1/3 mr-2">
            <label htmlFor="option2" className="block mb-1">
              Option 2:
            </label>
            <input
              type="text"
              id="option2"
              name="option2"
              value={formData.option2}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="option3" className="block mb-1">
              Option 3:
            </label>
            <input
              type="text"
              id="option3"
              name="option3"
              value={formData.option3}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="correctAnswer" className="block mb-1">
            Correct Answer:
          </label>
          <select
            id="correctAnswer"
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
            required
          >
            <option value="">Select correct answer</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {questions.length > 0 && (
        <div className="border border-gray-300 rounded p-4 w-96">
          <h2 className="text-lg font-semibold mb-2">Created Questions:</h2>
          <ul>
            {questions.map((item, index) => (
              <li key={index} className="mb-2">
                {item.question}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateQuizForm;
