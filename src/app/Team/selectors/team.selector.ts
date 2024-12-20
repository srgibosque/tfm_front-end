import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TeamState } from "../reducers";

export const selectTeamAppState = createFeatureSelector<TeamState>('teamApp');


export const selectPlayersToAdd = createSelector(
  selectTeamAppState,
  (state: TeamState) => state.playersToAdd
);