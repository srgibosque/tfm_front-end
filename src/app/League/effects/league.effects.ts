import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { getLeague, getLeagueFailure, getLeagueSuccess, getLeagueTable, getLeagueTableFailure, getLeagueTableSuccess } from "../actions";
import { LeagueService } from "../services/league.service";

@Injectable()
export class LeagueEffects {
  constructor(
    private actions$: Actions,
    private leagueService: LeagueService,
  ) { }

  getLeague$ = createEffect(() => this.actions$.pipe(
    ofType(getLeague),
    switchMap(({leagueId}) => {
      return this.leagueService.getLeague(leagueId).pipe(
        map((leagueRes) => getLeagueSuccess({ message:leagueRes.message, league: leagueRes.league  })),
        catchError((err) => of(getLeagueFailure({ error: err })))
      )
    })
  ));

  getLeagueTable$ = createEffect(() => this.actions$.pipe(
    ofType(getLeagueTable),
    switchMap(({leagueId}) => {
      return this.leagueService.getLeagueTable(leagueId).pipe(
        map((table) => getLeagueTableSuccess({leagueTable: table})),
        catchError((err) => of(getLeagueTableFailure({ error: err })))
      )
    })
  ));
}