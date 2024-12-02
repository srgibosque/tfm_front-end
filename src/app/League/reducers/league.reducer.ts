import { createReducer, on } from "@ngrx/store";
import { getLeague, getLeagueFailure, getLeagueSuccess } from "../actions";
import { League } from "../models/league.interface";

export interface LeagueState {
  league: League;
  loading: boolean;
  loaded: boolean;
  error: any;
  message: string | null;
}

export const initialState: LeagueState = {
  league: {
    id: undefined,
    name: '',
    Matches: [],
    location: '',
  },
  loading: false,
  loaded: false,
  error: null,
  message: null,
};

export const leagueReducer = createReducer(
  initialState,
  on(getLeague, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),

  on(getLeagueSuccess, (state, {message, league}) => ({
    ...state,
    loaded: true,
    loading: false,
    league: league,
    message: message,
  })),

  on(getLeagueFailure, (state, {error}) => ({
    ...state,
    loaded: false,
    loading: false,
    error: error,
  })),
);