export interface QuestionCategoryModel {
  title: string;
  era: string;
  category: string;
  id: number;
  topicCount: number;
  number: number;
}

export type GetQuestionCategoryModel = QuestionCategoryModel[];
export type AddQuestionCategoryModel = Pick<
  QuestionCategoryModel,
  "title" | "era" | "category"
>;
export type UpdateQuestionCategoryModel = {
  updatedQuestionCategory: Pick<
    QuestionCategoryModel,
    "title" | "era" | "category"
  >;
  id: number;
};
export type DeleteQuestionCategoryModel = Pick<QuestionCategoryModel, "id">;

export type QuestionCategoryOrderModel = Pick<
  QuestionCategoryModel,
  "number" | "id"
>;
