import { createReducer, on } from "@ngrx/store";
import {
  clearError,
  clearMessage,
  getMatch,
  getMatchFailure,
  getMatchSuccess,
  updateMatch,
  updateMatchFailure,
  updateMatchSuccess
} from "../../Match/actions";
import { Match } from "../models/match.interface";

export interface MatchState {
  match: Match;
  loading: boolean;
  loaded: boolean;
  error: any;
  message: string | null;
}

export const initialState: MatchState = {
  match: {
    name: '',
    location: '',
    date: '',
    homeTeamGoals: null,
    awayTeamGoals: null,
    homeTeamId: undefined,
    awayTeamId: undefined,
    leagueId: undefined,
  },
  loading: false,
  loaded: false,
  error: null,
  message: null,
};

export const matchReducer = createReducer(
  initialState,
  on(getMatch, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),

  on(getMatchSuccess, (state, { message, match }) => ({
    ...state,
    match: match,
    loaded: true,
    loading: false
  })),

  on(getMatchFailure, (state, { error }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: error,
  })),

  on(updateMatch, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    message: null,
  })),

  on(updateMatchSuccess, (state, { message, match }) => ({
    ...state,
    match: {
      ...state.match,
      ...match,
    },
    loading: false,
    loaded: true,
    message: message,
  })),

  on(updateMatchFailure, (state, { error }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: error,
  })),

  //CLEAR MESSAGES AND ERRORS
  on(clearMessage, (state) => ({ ...state, message: null })),
  on(clearError, (state) => ({ ...state, error: null }))
);