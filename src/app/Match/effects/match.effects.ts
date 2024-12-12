import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { getMatch, getMatchFailure, getMatchSuccess } from "../actions";
import { MatchService } from "../services/match.service";

@Injectable()
export class MatchEffects {
  constructor(
    private actions$: Actions,
    private matchService: MatchService,
  ) { }

  getMatch$ = createEffect(() => this.actions$.pipe(
    ofType(getMatch),
    switchMap(({ matchId }) => {
      return this.matchService.getMatch(matchId).pipe(
        map((matchRes) => getMatchSuccess({ message: matchRes.message, match: matchRes.match })),
        catchError((err) => of(getMatchFailure({ error: err })))
      )
    })
  )
  );
}