export interface TimelineModel {
  era: string;
  startDate: number;
  endDate: number;
  jjhNumber: number;
  id: number;
}

export type GetTimelineModel = TimelineModel[];

export type AddTimelineModel = Omit<TimelineModel, "id" | "jjhNumber">;

export type UpdateTimelineModel = {
  id: number;
  updatedTimeline: Omit<TimelineModel, "id" | "jjhNumber">;
};
