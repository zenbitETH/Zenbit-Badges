// types.ts
export interface Question {
  question: string;
  options: string[];
  answer: string;
  _id: string;
}

export interface Answers {
  [key: string]: string;
}
