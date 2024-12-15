import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import {
  createLeague,
  createLeagueFailure,
  createLeagueSuccess,
  getLeague,
  getLeagueFailure,
  getLeagueSuccess,
  getLeagueTable,
  getLeagueTableFailure,
  getLeagueTableSuccess
} from "../actions";
import { LeagueService } from "../services/league.service";
import { Router } from "@angular/router";

@Injectable()
export class LeagueEffects {
  constructor(
    private actions$: Actions,
    private leagueService: LeagueService,
    private router: Router
  ) { }

  getLeague$ = createEffect(() => this.actions$.pipe(
    ofType(getLeague),
    switchMap(({ leagueId }) => {
      return this.leagueService.getLeague(leagueId).pipe(
        map((leagueRes) => getLeagueSuccess({ message: leagueRes.message, league: leagueRes.league })),
        catchError((err) => of(getLeagueFailure({ error: err })))
      )
    })
  ));

  getLeagueTable$ = createEffect(() => this.actions$.pipe(
    ofType(getLeagueTable),
    switchMap(({ leagueId }) => {
      return this.leagueService.getLeagueTable(leagueId).pipe(
        map((table) => getLeagueTableSuccess({ leagueTable: table })),
        catchError((err) => of(getLeagueTableFailure({ error: err })))
      )
    })
  ));

  createLeague$ = createEffect(() => this.actions$.pipe(
    ofType(createLeague),
    switchMap(({ name, location, teamIds }) => {
      return this.leagueService.createLeague({ name, location, teamIds }).pipe(
        map((response) => {
          return createLeagueSuccess({ message: response.message });
        }),
        catchError((err) => {
          return of(createLeagueFailure({ error: err }))
        })
      )
    })
  ));

  createLeagueSuccess = createEffect(() => this.actions$.pipe(
    ofType(createLeagueSuccess),
    tap(() => {
      this.router.navigate(['/my-leagues']);
    })
  ), { dispatch: false });
}