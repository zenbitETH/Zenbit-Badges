"use client";

import React from "react";
import { Question } from "~~/utils/scaffold-eth/quiz";

interface QuestionProps {
  question: Question;
  questionIndex: number;
  handleOptionChange: (questionIndex: string, option: string) => void;
  answer?: string;
}

const QuestionComponent: React.FC<QuestionProps> = ({ question, questionIndex, handleOptionChange, answer }) => {
  return (
    <div className="p-6 border rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {questionIndex + 1}. {question.question}
      </h3>
      <div className="flex justify-between">
        {question.options.map((option, index) => (
          <label key={index} className="flex items-center ">
            <input
              type="radio"
              className="mr-2"
              name={`question-${questionIndex}`}
              value={option}
              checked={answer === option}
              onChange={() => handleOptionChange(question?._id, option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
