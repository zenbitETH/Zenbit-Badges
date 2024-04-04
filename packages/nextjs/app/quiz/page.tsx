"use client";

import React, { useEffect, useState } from "react";
import QuestionComponent from "~~/components/Question";
import questions from "~~/quiz/quizzes.json";
// import Question from "~/components/Question";
import { Answers } from "~~/utils/scaffold-eth/quiz";

const Quiz = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<string | null>(null);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const handleOptionChange = (questionIndex: number, option: string) => {
    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  };

  useEffect(() => {
    const answeredQuestionsCount = Object.keys(answers).length;
    setAllQuestionsAnswered(answeredQuestionsCount === questions.length);
  }, [answers]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const score = questions.reduce((total, question, index) => {
      if (answers[index] === (question as any)?.answer) {
        return total + 1;
      }
      return total;
    }, 0);

    setResult(`You scored ${score} out of ${questions.length}`);
  };

  // Check for the access to the questions before rendering the component
  return (
    <div className="min-w-xl max-w-xl mx-auto flex justify-center m-10">
      {questions.length > 0 ? (
        <div className="min-w-xl max-w-xl rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {questions.map((question, index) => (
              <QuestionComponent
                key={index}
                question={question}
                questionIndex={index}
                handleOptionChange={handleOptionChange}
                answer={answers[index]}
              />
            ))}
            <button
              type="submit"
              className={`${
                allQuestionsAnswered ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
              } px-4 py-2 rounded mx-auto block ${allQuestionsAnswered ? "" : "pointer-events-none"}`}
              disabled={!allQuestionsAnswered}
            >
              Submit
            </button>
          </form>
          {result && <p className="text-center mt-4">{result}</p>}
        </div>
      ) : (
        <p>No questions available</p>
      )}
    </div>
  );
};
export default Quiz;
