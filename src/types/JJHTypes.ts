import { ChapterModel } from "./chapterTypes";
import { TimelineModel } from "./timelinTypes";

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
