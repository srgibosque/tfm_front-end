import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LeagueState } from "../reducers";

export const selectLeagueAppState = createFeatureSelector<LeagueState>('leagueApp');

export const selectTeams = createSelector(
  selectLeagueAppState,
  (state: LeagueState) => state.league.Teams
);

export const selectMatches = createSelector(
  selectLeagueAppState,
  (state: LeagueState) => state.league.Matches
);

export const selectLeagueTable = createSelector(
  selectLeagueAppState,
  (state: LeagueState) => state.leagueTable
);

export const selectTeamsToAdd = createSelector(
  selectLeagueAppState,
  (state: LeagueState) => state.teamsToAdd
);
