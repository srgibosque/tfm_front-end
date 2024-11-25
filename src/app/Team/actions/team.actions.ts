import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Team } from "../models/team.interface";

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