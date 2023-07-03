export interface DescriptionModel {
  content: string;
  id: number;
}

export interface UpdateDescriptionModel {
  content: string;
  descriptionId: number;
}

export interface AddDescriptionModel {
  contentList: string[];
  topicTitle: string;
}

export interface DuplicationChoiceModel {
  topicTitle: string;
  content: string;
  id: number;
}

export interface AddDuplicationChoiceModel {
  choiceList: number[];
  descriptionId: number;
}

export interface DeleteDuplicationChoiceModel {
  choiceId: number;
  descriptionId: number;
}
