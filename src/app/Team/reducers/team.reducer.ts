import { User } from './../../Profile/models/user.interface';
import { createReducer, on } from "@ngrx/store";
import { Team } from "../models/team.interface";
import { addPlayerToTeam, addPlayerToTeamFailure, addPlayerToTeamSuccess, createTeam, createTeamFailure, createTeamSuccess, deleteTeam, deleteTeamFailure, deleteTeamSuccess, getTeam, getTeamFailure, getTeamSuccess, removePlayerToAdd, updateTeam, updateTeamFailure, updateTeamSuccess } from "../actions";

export interface TeamState {
  team: Team;
  playersToAdd: User[];
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
    Users: [],
    location: '',
    userteamname: '',
  },
  playersToAdd: [],
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

   on(createTeam, (state) => ({
      ...state,
      loading: true,
      loaded: false
    })),
  
    on(createTeamSuccess, (state, { message }) => ({
      ...state,
      loading: false,
      loaded: true,
      message: message,
      teamsToAdd: [],
    })),
  
    on(createTeamFailure, (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error
    })),
  
    on(addPlayerToTeam, (state) => ({
      ...state,
      loading: true,
      loaded: false
    })),
  
    on(addPlayerToTeamSuccess, (state, { message, user }) => ({
      ...state,
      loading: false,
      loaded: true,
      message: message,
      playersToAdd: [...state.playersToAdd, user],
    })),
  
    on(addPlayerToTeamFailure, (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error
    })),
  
    on(removePlayerToAdd, (state, { playerId }) => ({
      ...state,
      playersToAdd: state.playersToAdd.filter(player => player.id !== playerId)
    })),
  
    on(deleteTeam, (state, { teamId }) => ({
      ...state,
      loading: true,
      loaded: false
    })),
  
    on(deleteTeamSuccess, (state, { message }) => ({
      ...state,
      loading: false,
      loaded: true,
      message: message,
    })),
  
    on(deleteTeamFailure, (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error
    })),

    on(updateTeam, (state, { teamId, name, contactEmail, location, userIds }) => ({
      ...state,
      loading: true,
      loaded: false
    })),

    on(updateTeamSuccess, (state, { message, team }) => ({
      ...state,
      loading: false,
      loaded: true,
      message: message,
    })),

    on(updateTeamFailure, (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error
    })),
);