export interface ChoiceModel {
  topic: string;
  content: string;
  id: number;
}

export interface addChoiceModel {
  choiceArr: string[];
  topic: string;
}

interface choice {
  content: string;
  id: number;
}

export interface updateChoiceModel {
  choiceList: choice[];
}
