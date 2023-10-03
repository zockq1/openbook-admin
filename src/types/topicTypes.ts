export interface ExtraDateModel {
  extraDate: number;
  extraDateComment: string;
}

export interface TopicModel {
  number?: number;
  chapter: number;
  title: string;
  category: string;
  era: string;
  dateComment: string;
  extraDateList: ExtraDateModel[];
  detail: string;
}

export interface UpdateTopicModel {
  updatedTopic: TopicModel;
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
  startDate: number;
  endDate: number;
  descriptionCount: number;
  choiceCount: number;
  keywordCount: number;
}
