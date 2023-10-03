export interface ChapterState {
  currentChapterTitle: string | null;
  currentChapterNumber: number | null;
}

export interface ChapterModel {
  title: string;
  number: number;
  dateComment: string;
}

export interface UpdateChapterModel {
  editedChapter: ChapterModel;
  currentChapterNumber: number;
}

export interface ChapterTitleModel {
  title: string;
}

export interface ChapterDateModel {
  dateComment: string;
}

export interface ChapterInfoModel {
  content: string;
}
