export interface ChoiceModel {
  content: string;
  id: number;
}

export interface addChoiceModel {
  choiceArr: string[];
  topicTitle: string;
}

interface choice {
  content: string;
  id: number;
}

export interface updateChoiceModel {
  choiceList: choice[];
}
