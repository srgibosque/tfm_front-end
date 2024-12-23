import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.reducer";

const selectAuthLoading = (state: AppState) => state.authApp.loading;
const selectProfileLoading = (state: AppState) => state.profileApp.loading;
const selectTeamLoading = (state: AppState) => state.teamApp.loading;
const selectLeagueLoading = (state: AppState) => state.leagueApp.loading;
const selectMatchLoading = (state: AppState) => state.matchApp.loading;

// Global loading selector
export const selectIsLoading = createSelector(
  selectAuthLoading,
  selectProfileLoading,
  selectTeamLoading,
  selectLeagueLoading,
  selectMatchLoading,
  (authLoading, profileLoading, teamLoading, leagueLoading, matchLoading) => 
    authLoading || profileLoading || teamLoading || leagueLoading || matchLoading
);

const selectAuthMessage = (state: AppState) => state.authApp.message;
const selectAuthError = (state: AppState) =>  state.authApp.error ? state.authApp.error.error?.message : null;

const selectProfileMessage = (state: AppState) => state.profileApp.message;
const selectProfileError = (state: AppState) =>  state.profileApp.error ? state.profileApp.error.error?.message : null;

const selectTeamMessage = (state: AppState) => state.teamApp.message;
const selectTeamError = (state: AppState) =>  state.teamApp.error ? state.teamApp.error.error?.message : null;

const selectLeagueMessage = (state: AppState) => state.leagueApp.message;
const selectLeagueError = (state: AppState) =>  state.leagueApp.error ? state.leagueApp.error.error?.message : null;

const selectMatchMessage = (state: AppState) => state.matchApp.message;
const selectMatchError = (state: AppState) =>  state.matchApp.error ? state.matchApp.error.error?.message : null;


export const selectGlobalMessage = createSelector(
  selectAuthMessage,
  selectProfileMessage,
  selectTeamMessage,
  selectLeagueMessage,
  selectMatchMessage,
  (authMessage, profileMessage, teamMessage, leagueMessage, matchMessage) => 
    authMessage || profileMessage || teamMessage || leagueMessage || matchMessage
);

export const selectGlobalError = createSelector(
  selectAuthError,
  selectProfileError,
  selectTeamError,
  selectLeagueError,
  selectMatchError,
  (authError, profileError, teamError, leagueError, matchError) => 
    authError || profileError || teamError || leagueError || matchError
);