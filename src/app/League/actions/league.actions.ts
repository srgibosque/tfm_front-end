import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { League } from "../models/league.interface";

export const getLeague = createAction(
  '[TEAM] Get League',
  props<{ leagueId: string }>()
);

export const getLeagueSuccess = createAction(
  '[TEAM] Get League success',
  props<{ message: string, league: League }>()
);

export const getLeagueFailure = createAction(
  '[TEAM] Get League failure',
  props<{ error: HttpErrorResponse }>()
);