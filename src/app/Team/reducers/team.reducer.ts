import { createReducer, on } from "@ngrx/store";
import { Team } from "../models/team.interface";
import { getTeam, getTeamFailure, getTeamSuccess } from "../actions";

export interface TeamState {
  team: Team;
  loading: boolean;
  loaded: boolean;
  error: any;
  message: string | null;
}

export const initialState: TeamState = {
  team: {
    id: undefined,
    name: '',
    contactEmail: '',
    players: [],
    location: '',
    userteamname: '',
  },
  loading: false,
  loaded: false,
  error: null,
  message: null,
};

export const teamReducer = createReducer(
  initialState,
  on(getTeam, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),

  on(getTeamSuccess, (state, {message, team}) => ({
    ...state,
    loaded: true,
    loading: false,
    team: team,
    message: message,
  })),

  on(getTeamFailure, (state, {error}) => ({
    ...state,
    loaded: false,
    loading: false,
    error: error,
  })),
);