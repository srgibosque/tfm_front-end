import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { getMatch, getMatchFailure, getMatchSuccess, updateMatch, updateMatchFailure, updateMatchSuccess } from "../actions";
import { MatchService } from "../services/match.service";
import { Match } from "../models/match.interface";
import { Router } from "@angular/router";

@Injectable()
export class MatchEffects {
  constructor(
    private actions$: Actions,
    private matchService: MatchService,
    private router: Router
  ) { }

  getMatch$ = createEffect(() => this.actions$.pipe(
    ofType(getMatch),
    switchMap(({ matchId }) => {
      return this.matchService.getMatch(matchId).pipe(
        map((matchRes) => getMatchSuccess({ message: matchRes.message, match: matchRes.match })),
        catchError((err) => of(getMatchFailure({ error: err })))
      )
    })
  ));

  updateProdile$ = createEffect(() => this.actions$.pipe(
    ofType(updateMatch),
    switchMap(({ matchId, date, location, homeTeamGoals, awayTeamGoals }) => {
      const updatedMatch: Match = { date, location, homeTeamGoals, awayTeamGoals };
      return this.matchService.updateMatch(matchId, updatedMatch).pipe(
        map(({ message, match }) => {
          return updateMatchSuccess({ message, match})
        }),

        catchError((err) => {
          return of(updateMatchFailure({ error: err }))
        })
      )
    })
  ));

  updateMatchSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(updateMatchSuccess),
      tap(({ match }) => {
        const leagueId = match.leagueId;
        if(leagueId){
          this.router.navigate(['/my-leagues', leagueId, 'matches']);
        }
      })
    ), { dispatch: false });
}