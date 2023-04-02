export interface TopicModel {
  chapter: number;
  title: string;
  category: string;
  startDate: number;
  endDate: number;
  detail: string;
  keywordList: string[];
}

export interface TopicListModel {
  topicList: string[];
}
