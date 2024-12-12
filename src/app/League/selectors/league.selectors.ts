import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LeagueState } from "../reducers";
import { Match } from "../../Match/models/match.interface";

export const selectLeagueAppState = createFeatureSelector<LeagueState>('leagueApp');

export const selectTeams = createSelector(
  selectLeagueAppState,
  (state: LeagueState) => state.league.Teams
);

export const selectMatches = createSelector(
  selectLeagueAppState,
  (state: LeagueState) => state.league.Matches
);

export const selectMatchById = (matchId: number) =>
  createSelector(
    selectMatches,
    (matches: Match[]) => matches.find(match => match.id === matchId)
  );
