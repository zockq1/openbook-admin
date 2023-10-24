import { ChapterModel } from "./chapterTypes";
import { TimelineModel } from "./timelineTypes";

interface JJHModel {
  id: number;
  jjhNumber: number;
}

export type GetJJHModel = {
  chapterList: Omit<ChapterModel, "dateComment">[];
  timelineList: TimelineModel[];
};

export type UpdateJJHModel = {
  chapterList: JJHModel[];
  timelineList: JJHModel[];
};

export interface SearchModel {
  chapterList: {
    chapterNumber: number;
    chapterTitle: string;
  }[];
  topicList: {
    chapterNumber: number;
    chapterTitle: string;
    topicTitle: string;
  }[];
  keywordList: {
    chapterNumber: number;
    chapterTitle: string;
    topicTitle: string;
    keywordName: string;
    keywordComment: string;
  }[];
}
