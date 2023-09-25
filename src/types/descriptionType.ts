export type CommentType = "Sentence" | "Keyword";

export interface DescriptionCommentModel {
  chapterNumber: number;
  topicTitle: string;
  type: CommentType;
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
  comment: { type: CommentType; id: number };
}

export interface DeleteDescriptionModel {
  descriptionId: number;
  comment: { type: CommentType; id: number };
}
