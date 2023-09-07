export interface RoundModel {
  date: number;
  number: number;
}

export interface RoundDateModel {
  date: number;
}

export interface UpdateRoundModel {
  roundNumber: number;
  updatedRound: RoundModel;
}
