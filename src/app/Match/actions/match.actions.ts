import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Match } from "../models/match.interface";

export const getMatch = createAction(
  '[MATCH] Get Match',
  props<{ matchId: string }>()
);

export const getMatchSuccess = createAction(
  '[MATCH] Get Match success',
  props<{ message: string, match: Match }>()
);

export const getMatchFailure = createAction(
  '[MATCH] Get Match failure',
  props<{ error: HttpErrorResponse }>()
);

export const updateMatch = createAction(
  '[MATCH] Update match',
  props<{ matchId: string, date: string, location: string, homeTeamGoals: number, awayTeamGoals: number }>()
);

export const updateMatchSuccess = createAction(
  '[MATCH] Update match success',
  props<{ message: string, match: Match }>()
);

export const updateMatchFailure = createAction(
  '[MATCH] Update match failure',
  props<{ error: HttpErrorResponse }>()
);