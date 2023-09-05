export interface ChapterState {
  currentChapterTitle: string | null;
  currentChapterNumber: number | null;
}

export interface ChapterModel {
  title: string;
  number: number;
  startDate: number | null;
  endDate: number | null;
}

export interface UpdateChapterModel {
  editedChapter: ChapterModel;
  currentChapterNumber: number;
}

export interface ChapterTitleModel {
  title: string;
}

export interface ChapterInfoModel {
  content: string;
}
