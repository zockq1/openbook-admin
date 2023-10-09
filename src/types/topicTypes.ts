export interface ExtraDateModel {
  extraDate: number;
  extraDateComment: string;
}

export interface TopicModel {
  number: number;
  chapter: number;
  title: string;
  category: string;
  era: string;
  dateComment: string;
  extraDateList: ExtraDateModel[];
  detail: string;
}

export interface UpdateTopicModel {
  updatedTopic: Omit<TopicModel, "number">;
  title: string;
}

export interface TopicOrderModel {
  number: number;
  title: string;
}

export interface TopicListModel {
  number: number;
  category: string;
  title: string;
  era: string;
  dateComment: string;
  descriptionCount: number;
  choiceCount: number;
  keywordCount: number;
}
