export type CreateQuiz = {
  question: string;
  answer: string;
  options: string[];
  eventId: string;
};

export type EventId = {
  eventId: string;
};
export interface MyObject {
  eventId: string;
  value: Record<string, string>;
}

export interface CheckLiveEventAnswerBody {
  eventId: string;
  value: string;
}

export interface EventDetailsSchema {
  type: string;
  value: string;
  state: boolean;
}

export interface Schemas {
  [key: string]: EventDetailsSchema;
}
