interface extraDateModel {
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
}

export interface UpdateKeywordModel {
  name: string;
  comment: string;
  id: number;
  file: any;
  dateComment: string;
  extraDateList: extraDateModel[];
}
