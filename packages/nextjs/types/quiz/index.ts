export type CreateQuiz = {
  question: string;
  answer: string;
  options: string[];
  eventId: string;
};

export type EventId = {
  eventId: string;
};
