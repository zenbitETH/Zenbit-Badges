"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  question: string;
  options: string[]; // Change the type to array of strings
  answer: string;
}

interface Question extends FormData {
  id: string; // Unique identifier for each question
}

const CreateQuizForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    question: "",
    options: ["", "", ""], // Initialize with empty strings
    answer: "",
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editMode, setEditMode] = useState<string | null>(null);
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.question || !formData.answer || formData?.options?.length < 3) {
      return;
    }
    const newQuestion: Question = {
      ...formData,
      id: editMode || Date.now().toString(),
    };

    if (editMode) {
      const updatedQuestions = questions.map(q => (q.id === editMode ? newQuestion : q));
      setQuestions(updatedQuestions);
      setEditMode(null);
    } else {
      setQuestions([...questions, newQuestion]);
    }

    setFormData({
      question: "",
      options: ["", "", ""], // Reset options
      answer: "",
    });
  };

  const handleEdit = (id: string) => {
    const questionToEdit = questions.find(q => q.id === id);
    if (!questionToEdit) return;
    if (!questionToEdit.question || !questionToEdit.answer || questionToEdit?.options?.length < 3) {
      return;
    }
    setFormData({
      question: questionToEdit.question,
      options: [...questionToEdit.options],
      answer: questionToEdit.answer,
    });
    setEditMode(id);
  };

  const handleDelete = (id: string) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    setQuestions(updatedQuestions);
    if (editMode === id) {
      setEditMode(null);
      setFormData({
        question: "",
        options: ["", "", ""],
        answer: "",
      });
    }
  };
  const exportQuiz = async (questions: Question[]) => {
    try {
      const response = await fetch("/api/exportQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questions),
      });

      if (response.ok) {
        console.log("Quiz exported successfully!");
      } else {
        console.error("Failed to export quiz");
      }
    } catch (error) {
      console.error("Error exporting quiz", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => {
          exportQuiz(questions);
        }}
      >
        Export Quiz
      </button>
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
                className="w-full border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label htmlFor="answer" className="block mb-1">
            Correct Answer:
          </label>
          <select
            id="answer"
            name="answer"
            value={formData.answer}
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
            {questions.map(({ id, question, answer }, index) => (
              <li key={id} className="mb-4 p-2 border">
                <p>
                  <strong>Question {index + 1} :</strong> {question}
                </p>
                <p>{/* <strong>Options:</strong> {option1}, {option2}, {option3} */}</p>
                <p>
                  <strong>Answer:</strong> {answer}
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
