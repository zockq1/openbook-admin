import { ChoiceType } from "./questionTypes";

export interface ChoiceModel {
  choice: string;
  comment: string;
  key: string;
  choiceType: ChoiceType;
}

export interface ChoiceListModel {
  choice: string;
  comment: string;
  key: string;
  id: number;
}

export interface GetChoiceModel {
  roundNumber: number;
  questionNumber: number;
}

export interface AddChoiceModel {
  choice: ChoiceModel;
  roundNumber: number;
  questionNumber: number;
}

export interface UpdateChoiceModel {
  choice: ChoiceModel;
  choiceId: number;
}
