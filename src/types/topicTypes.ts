export interface TopicModel {
  chapter: number;
  title: string;
  category: string;
  startDate: Date;
  endDate: Date;
  detail: string;
  keywordList: string[];
}

export interface TopicListModel {
  topicList: string[];
}
