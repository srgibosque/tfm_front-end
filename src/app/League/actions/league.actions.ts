import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { League } from "../models/league.interface";
import { LeagueTable } from "../models/league-table.interface";
import { Team } from "../../Team/models/team.interface";

export const getLeague = createAction(
  '[LEAGUE] Get League',
  props<{ leagueId: string }>()
);

export const getLeagueSuccess = createAction(
  '[LEAGUE] Get League success',
  props<{ message: string, league: League }>()
);

export const getLeagueFailure = createAction(
  '[LEAGUE] Get League failure',
  props<{ error: HttpErrorResponse }>()
);

export const getLeagueTable = createAction(
  '[LEAGUE] Get League table',
  props<{ leagueId: string }>()
);

export const getLeagueTableSuccess = createAction(
  '[LEAGUE] Get League table success',
  props<{ leagueTable: LeagueTable }>()
);

export const getLeagueTableFailure = createAction(
  '[LEAGUE] Get League table failure',
  props<{ error: HttpErrorResponse }>()
);

export const createLeague = createAction(
  '[LEAGUE] create league',
  props< { name: string, location: string, teamIds: number[] } >()
);

export const createLeagueSuccess = createAction(
  '[LEAGUE] create league success',
  props<{ message: string }>()
);

export const createLeagueFailure = createAction(
  '[LEAGUE] create league failure',
  props<{ error: HttpErrorResponse }>()
);

export const addTeamToLeague = createAction(
  '[LEAGUE] Add Team',
  props<{ teamName: string }>()
);

export const addTeamToLeagueSuccess = createAction(
  '[LEAGUE] Add Team Success',
  props<{ message:string, team: Team }>()
);

export const addTeamToLeagueFailure = createAction(
  '[LEAGUE] Add Team Failure',
  props<{ error: HttpErrorResponse }>()
);