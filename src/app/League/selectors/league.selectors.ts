import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LeagueState } from "../reducers";

export const selectLeagueAppState = createFeatureSelector<LeagueState>('leagueApp');

export const selectMatches = createSelector(
  selectLeagueAppState,
  (state: LeagueState) => state.league.Matches
);

