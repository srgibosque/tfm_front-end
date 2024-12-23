import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Team } from "../models/team.interface";
import { User } from "../../Profile/models/user.interface";

export const getTeam = createAction(
  '[TEAM] Get Team',
  props<{ teamId: string }>()
);

export const getTeamSuccess = createAction(
  '[TEAM] Get Team success',
  props<{ message: string, team: Team }>()
);

export const getTeamFailure = createAction(
  '[TEAM] Get Team failure',
  props<{ error: HttpErrorResponse }>()
);

export const createTeam = createAction(
  '[TEAM] Create team',
  props<{ name: string, userTeamName: string, location: string, contactEmail: string, userIds: number[] }>()
);

export const createTeamSuccess = createAction(
  '[TEAM] Create team success',
  props<{ message: string }>()
);

export const createTeamFailure = createAction(
  '[TEAM] Create team failure',
  props<{ error: HttpErrorResponse }>()
);

export const addPlayerToTeam = createAction(
  '[TEAM] Add player',
  props<{ email: string }>()
);

export const addPlayerToTeamSuccess = createAction(
  '[TEAM] Add player Success',
  props<{ message: string, user: User }>()
);

export const addPlayerToTeamFailure = createAction(
  '[TEAM] Add player Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadPlayersToAdd = createAction(
  '[TeamForm] Load Players to Add',
  props<{ players: User[] }>()
);

export const removePlayerToAdd = createAction(
  '[TEAM] Remove player to add',
  props<{ playerId: number }>()
);

export const deleteTeam = createAction(
  '[TEAM] Delete Team',
  props<{ teamId: string }>()
);

export const deleteTeamSuccess = createAction(
  '[TEAM] Delete Team success',
  props<{ message: string }>()
);

export const deleteTeamFailure = createAction(
  '[TEAM] Delete Team failure',
  props<{ error: HttpErrorResponse }>()
);

export const updateTeam = createAction(
  '[PROFILE] Update Team',
  props<{ teamId: string, name: string, contactEmail: string, location: string, userIds: number[] }>()
);

export const updateTeamSuccess = createAction(
  '[PROFILE] Update Team Success',
  props<{ message: string, team: Team }>()
);

export const updateTeamFailure = createAction(
  '[PROFILE] Update Team Failure',
  props<{ error: HttpErrorResponse }>()
);

// CLEAR Message and error
export const clearMessage = createAction(
  '[TEAM] Clear Message'
);
export const clearError = createAction(
  '[TEAM] Clear Error'
);