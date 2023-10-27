export interface ExtraDateModel {
  extraDate: number;
  extraDateComment: string;
}

export type GetTopicModel = {
  title: string;
  number: number;
  chapter: number;
  questionCategory: {
    id: number | null;
    title: string;
  };
  dateComment: string;
  extraDateList: ExtraDateModel[];
  detail: string;
};

export type TopicListModel = {
  title: string;
  number: number;
  questionCategory: {
    title: string;
  };
  dateComment: string;
  descriptionCount: number;
  choiceCount: number;
  keywordCount: number;
}[];

export type AddTopicModel = {
  title: string;
  number: number;
  chapter: number;
  questionCategory: { id: number };
  dateComment: string;
  extraDateList: ExtraDateModel[];
  detail: string;
};

export type UpdateTopicModel = {
  updatedTopic: {
    number: number;
    chapter: number;
    title: string;
    questionCategory: { id: number };
    dateComment: string;
    extraDateList: ExtraDateModel[];
    detail: string;
  };
  prevTitle: string;
};

export type TopicOrderModel = {
  number: number;
  title: string;
};

export type TopicFormModel = {
  title: string;
  number: number;
  chapter: number;
  questionCategory: number;
  dateComment: string;
  extraDateList: ExtraDateModel[];
  detail: string;
};
