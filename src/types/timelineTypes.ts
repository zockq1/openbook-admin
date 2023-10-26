export interface TimelineModel {
  title: string;
  era: string;
  startDate: number;
  endDate: number;
  jjhNumber: number;
  id: number;
}

export type GetTimelineModel = TimelineModel[];

export type AddTimelineModel = Pick<
  TimelineModel,
  "title" | "era" | "startDate" | "endDate"
>;

export type UpdateTimelineModel = {
  id: number;
  updatedTimeline: Pick<
    TimelineModel,
    "title" | "era" | "startDate" | "endDate"
  >;
};

export type DeleteTimelineModel = Pick<TimelineModel, "id">;
