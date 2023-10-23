export interface ChapterModel {
  id: number;
  title: string;
  number: number;
  dateComment: string;
  jjhNumber: number;
}

export type GetChapterModel = Omit<ChapterModel, "jjhNumber">[];

export type AddChapterModel = Omit<ChapterModel, "jjhNumber" | "id">;

export type UpdateChapterModel = {
  editedChapter: Omit<ChapterModel, "jjhNumber" | "id">;
  currentChapterNumber: number;
};

export type ChapterTitleModel = Pick<ChapterModel, "title">;

export type ChapterDateModel = Pick<ChapterModel, "dateComment">;

export type GetChapterInfoModel = {
  content: string;
};

export type UpdateChapterInfoModel = {
  content: string;
  chapterNumber: number;
};

export type ChapterOrderModel = Pick<ChapterModel, "id" | "number">;

// export interface ChapterState {
//   currentChapterTitle: string | null;
//   currentChapterNumber: number | null;
// }

// export interface ChapterModel {
//   title: string;
//   number: number;
//   dateComment: string;
// }

// export interface GetChapterModel {
//   id: number;
//   title: string;
//   number: number;
//   dateComment: string;
// }

// export interface UpdateChapterModel {
//   editedChapter: ChapterModel;
//   currentChapterNumber: number;
// }

// export interface ChapterTitleModel {
//   title: string;
// }

// export interface ChapterDateModel {
//   dateComment: string;
// }

// export interface ChapterInfoModel {
//   content: string;
// }

// export interface ChapterOrderModel {
//   number: number;
//   id: number;
// }
