export interface DescriptionModel {
  content: string;
  topic: string;
  id: number;
}

export interface UpdateDescriptionModel {
  content: string;
  descriptionId: number;
}

export interface AddDescriptionModel {
  content: string;
  topicTitle: string;
}
