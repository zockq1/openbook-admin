export interface DescriptionModel {
  content: string;
  id: number;
}

export interface UpdateDescriptionModel {
  content: string;
  descriptionId: number;
}

export interface AddDescriptionModel {
  contentList: string[];
  topicTitle: string;
}
