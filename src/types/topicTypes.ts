export interface TopicModel {
  chapter: number;
  title: string;
  category: string;
  startDate: number;
  endDate: number;
  detail: string;
}

export interface UpdateTopicModel {
  updatedTopic: TopicModel;
  title: string;
}

export interface TopicListModel {
  topicList: string[];
}
