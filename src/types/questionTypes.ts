export interface ChoiceModel {
  choice: string;
  comment: string;
  key: string;
  id?: number | null;
}

export interface QuestionModel {
  number: number;
  description: string;
  descriptionComment: string;
  answer: string;
  choiceList: ChoiceModel[];
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
