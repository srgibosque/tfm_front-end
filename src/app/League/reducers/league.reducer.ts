import { createReducer, on } from "@ngrx/store";
import { addTeamToLeague, addTeamToLeagueFailure, addTeamToLeagueSuccess, createLeague, createLeagueFailure, createLeagueSuccess, deleteLeague, deleteLeagueFailure, deleteLeagueSuccess, getLeague, getLeagueFailure, getLeagueSuccess, getLeagueTable, getLeagueTableFailure, getLeagueTableSuccess, removeTeamToAdd } from "../actions";
import { League } from "../models/league.interface";
import { LeagueTable } from "../models/league-table.interface";
import { Team } from "../../Team/models/team.interface";

export interface LeagueState {
  league: League;
  leagueTable: LeagueTable;
  teamsToAdd: Team[];
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
  teamsToAdd: [],
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

  on(createLeague, (state) => ({
    ...state,
    loading: true,
    loaded: false
  })),

  on(createLeagueSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    loaded: true,
    message: message,
    teamsToAdd: [],
  })),

  on(createLeagueFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error
  })),

  on(addTeamToLeague, (state) => ({
    ...state,
    loading: true,
    loaded: false
  })),

  on(addTeamToLeagueSuccess, (state, { message, team }) => ({
    ...state,
    loading: false,
    loaded: true,
    message: message,
    teamsToAdd: [...state.teamsToAdd, team],
  })),

  on(addTeamToLeagueFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error
  })),

  on(removeTeamToAdd, (state, { teamId }) => ({
    ...state,
    teamsToAdd: state.teamsToAdd.filter(team => team.id !== teamId)
  })),

  on(deleteLeague, (state, { leagueId }) => ({
    ...state,
    loading: true,
    loaded: false
  })),

  on(deleteLeagueSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    loaded: true,
    message: message,
  })),

  on(deleteLeagueFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error
  })),
);