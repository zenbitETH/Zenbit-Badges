"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  correctAnswer: string;
}

interface Question extends FormData {
  id: string; // Unique identifier for each question
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
  const [editMode, setEditMode] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const actualAnswer = formData[formData.correctAnswer as keyof FormData];
    const newQuestion: Question = {
      ...formData,
      correctAnswer: actualAnswer,
      id: editMode || Date.now().toString(), // Use current timestamp as a makeshift ID
    };

    if (editMode) {
      const updatedQuestions = questions.map(q => (q.id === editMode ? newQuestion : q));
      setQuestions(updatedQuestions);
      setEditMode(null);
    } else {
      setQuestions([...questions, newQuestion]);
    }

    // Reset the form
    setFormData({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      correctAnswer: "",
    });
  };

  const handleEdit = (id: string) => {
    const questionToEdit = questions.find(q => q.id === id);
    if (!questionToEdit) return;

    const correctAnswerReference =
      Object.keys(formData).find(key => formData[key as keyof FormData] === questionToEdit.correctAnswer) || "";

    setFormData({
      question: questionToEdit.question,
      option1: questionToEdit.option1,
      option2: questionToEdit.option2,
      option3: questionToEdit.option3,
      correctAnswer: correctAnswerReference,
    });
    setEditMode(id);
  };

  const handleDelete = (id: string) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    setQuestions(updatedQuestions);
    // Exit edit mode if the currently edited question is deleted
    if (editMode === id) {
      setEditMode(null);
      setFormData({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        correctAnswer: "",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="border border-gray-300 rounded p-4 mb-4">
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
          {editMode ? "Update Question" : "Add Question"}
        </button>
      </form>

      {questions.length > 0 && (
        <div className="border border-gray-300 rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Created Questions:</h2>
          <ul>
            {questions.map(({ id, question, option1, option2, option3, correctAnswer }) => (
              <li key={id} className="mb-4 p-2 border-b">
                <p>
                  <strong>Question:</strong> {question}
                </p>
                <p>
                  <strong>Options:</strong> {option1}, {option2}, {option3}
                </p>
                <p>
                  <strong>Answer:</strong> {correctAnswer}
                </p>
                <button onClick={() => handleEdit(id)} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateQuizForm;
