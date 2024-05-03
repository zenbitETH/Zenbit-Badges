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
    <div className="p-6 rounded-md bg-gray-200">
      <h3 className="font-mus md:text-xl mb-6">
        {questionIndex + 1}. {question.question}
      </h3>
      {eventData?.[0] == 1 && (
        <div className=" ">
          {question?.options?.map((option, index) => (
            <label key={index} className="md:text-xl mx-auto flex items-center  ">
              <input
                type="radio"
                className="m-2 h-10 radio "
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
            className="flex-1 outline-none "
            name={`question-${questionIndex}`}
            value={answer}
            onChange={e => handleOptionChange(question?._id, e.target.value)}
            placeholder="Escribe el dominio ENS de tu DAO"
          />
        </div>
      )}
    </div>
  );
};

export default QuestionComponent;
