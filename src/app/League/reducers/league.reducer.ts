import { createReducer, on } from "@ngrx/store";
import { getLeague, getLeagueFailure, getLeagueSuccess, getLeagueTable, getLeagueTableFailure, getLeagueTableSuccess } from "../actions";
import { League } from "../models/league.interface";
import { LeagueTable } from "../models/league-table.interface";

export interface LeagueState {
  league: League;
  leagueTable: LeagueTable
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
    Teams: [],
    location: '',
  },
  leagueTable: {
    table: [],
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

  on(getLeagueSuccess, (state, { message, league }) => ({
    ...state,
    loaded: true,
    loading: false,
    league: league,
    message: message,
  })),

  on(getLeagueFailure, (state, { error }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: error,
  })),

  on(getLeagueTable, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),

  on(getLeagueTableSuccess, (state, { leagueTable }) => ({
    ...state,
    loaded: true,
    loading: false,
    leagueTable: leagueTable
  })),

  on(getLeagueTableFailure, (state, { error }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: error,
  })),
);