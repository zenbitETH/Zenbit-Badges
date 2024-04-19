"use client";

import React from "react";
import { Question } from "~~/utils/scaffold-eth/quiz";

interface QuestionProps {
  question: Question;
  questionIndex: number;
  handleOptionChange: (questionIndex: string, option: string) => void;
  answer?: string;
  eventData: any;
}

const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  questionIndex,
  handleOptionChange,
  answer,
  eventData,
}) => {
  return (
    <div className="p-6 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {questionIndex + 1}. {question.question}
      </h3>
      {eventData?.[0] == 1 && (
        <div className="flex justify-between">
          {question?.options?.map((option, index) => (
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
      )}
      {eventData?.[0] == 2 && (
        <div className="flex items-center justify-between border border-gray-300 rounded-md p-2">
          <input
            type="text"
            className="flex-1 outline-none"
            name={`question-${questionIndex}`}
            value={answer}
            onChange={e => handleOptionChange(question?._id, e.target.value)}
            placeholder="Enter the DAO address"
          />
        </div>
      )}
    </div>
  );
};

export default QuestionComponent;
