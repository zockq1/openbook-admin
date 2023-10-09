export interface extraDateModel {
  extraDate: number;
  extraDateComment: string;
}

export interface AddKeywordModel {
  name: string;
  comment: string;
  topic: string;
  file: any;
  dateComment: string;
  extraDateList: extraDateModel[];
  number: number;
}

interface QuestionModel {
  roundNumber: number;
  questionNumber: number;
}

export interface KeywordModel {
  name: string;
  comment: string;
  id: number;
  file: any;
  dateComment: string;
  extraDateList: extraDateModel[];
  questionList: QuestionModel[];
  number: number;
}

export interface UpdateKeywordModel {
  name: string;
  comment: string;
  id: number;
  file: any;
  dateComment: string;
  extraDateList: extraDateModel[];
  number: number;
}

export interface KeywordOrderModel {
  id: number;
  number: number;
}
