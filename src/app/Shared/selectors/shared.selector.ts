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

export const selectGlobalMessage = createSelector(
  selectAuthMessage,
  // Add other reducers' messages here
  (authMessage) => authMessage
);

export const selectGlobalError = createSelector(
  selectAuthError,
  // Add other reducers' errors here
  (authError) => authError
);