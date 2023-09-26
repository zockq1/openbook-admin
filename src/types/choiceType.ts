import { CommentType } from "./descriptionType";

export type ChoiceType = "String" | "Image";

export interface ChoiceCommentModel {
  chapterNumber: number;
  topicTitle: string;
  type: CommentType;
  name: string;
  id: number;
}

export interface GetChoiceModel {
  choice: string;
  choiceType: ChoiceType;
  choiceId: number;
  choiceNumber: number;
  commentList: ChoiceCommentModel[];
}

export interface AddChoiceModel {
  roundNumber: number;
  questionNumber: number;
  choice: { choice: string; choiceNumber: number; choiceType: ChoiceType };
}

export interface UpdateChoiceModel {
  choiceId: number;
  choice: { choice: string; choiceNumber: number; choiceType: ChoiceType };
}

export interface AddChoiceCommentModel {
  choiceId: number;
  comment: { type: CommentType; id: number };
}

export interface DeleteChoiceCommentModel {
  choiceId: number;
  comment: { type: CommentType; id: number };
}
