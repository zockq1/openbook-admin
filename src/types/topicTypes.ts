export interface TopicModel {
  chapter: number;
  title: string;
  category: string;
  startDate: any;
  endDate: any;
  detail: string;
}

export interface UpdateTopicModel {
  updatedTopic: TopicModel;
  title: string;
}

export interface TopicListModel {
  topicList: string[];
}
