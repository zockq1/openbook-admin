export interface ChapterState {
  currentChapterTitle: string | null;
  currentChapterNumber: number | null;
}

export interface ChapterListModel {
  titleList: string[];
  numberList: number[];
}
