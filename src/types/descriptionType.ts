export interface DescriptionCommentModel {
  chapterNumber: number;
  topicTitle: string;
  name: string;
  id: number;
}

export interface GetDescriptionModel {
  description: string;
  descriptionId: number;
  commentList: DescriptionCommentModel[];
}

export interface UpdateDescriptionModel {
  descriptionId: number;
  description: string;
}

export interface AddDescriptionModel {
  descriptionId: number;
  comment: { id: number };
}

export interface DeleteDescriptionModel {
  descriptionId: number;
  comment: { id: number };
}
