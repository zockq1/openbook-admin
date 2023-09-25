export interface ChoiceModel {
  choice: string;
  comment: string;
  key: string;
  id?: number | null;
}
export type ChoiceType = "String" | "Image";

export interface QuestionModel {
  number: number;
  answer: number;
  choiceType: ChoiceType;
  score: number;
}

export interface GetQuestionModel {
  roundNumber: number;
  questionNumber: number;
}

export interface AddQuestionModel {
  roundNumber: number;
  question: QuestionModel;
}

export interface UpdateQuestionModel {
  roundNumber: number;
  currentQuestionNumber: number;
  updatedQuestion: QuestionModel;
}

export interface DeleteQuestionModel {
  roundNumber: number;
  questionNumber: number;
}
