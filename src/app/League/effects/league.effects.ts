import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { getLeague, getLeagueFailure, getLeagueSuccess } from "../actions";
import { LeagueService } from "../services/team.service";

@Injectable()
export class LeagueEffects {
  constructor(
    private actions$: Actions,
    private leagueService: LeagueService,
  ) { }

  getTeam$ = createEffect(() => this.actions$.pipe(
    ofType(getLeague),
    switchMap(({leagueId}) => {
      return this.leagueService.getLeague(leagueId).pipe(
        map((leagueRes) => getLeagueSuccess({ message:leagueRes.message, league: leagueRes.league  })),
        catchError((err) => of(getLeagueFailure({ error: err })))
      )
    })
  )
  );
}