export interface AddKeywordModel {
  name: string;
  comment: string;
  topic: string;
  file: any;
}

export interface UpdateKeywordModel {
  name: string;
  comment: string;
  file: any;
  id: number;
}

export interface KeywordModel {
  name: string;
  comment: string;
  id: number;
  file: any;
}
