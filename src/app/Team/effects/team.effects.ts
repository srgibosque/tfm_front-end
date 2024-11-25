import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { TeamService } from "../services/team.service";
import { getTeam, getTeamFailure, getTeamSuccess } from "../actions";

@Injectable()
export class TeamEffects {
  constructor(
    private actions$: Actions,
    private teamService: TeamService,
  ) { }

  getTeam$ = createEffect(() => this.actions$.pipe(
    ofType(getTeam),
    switchMap(({teamId}) => {
      return this.teamService.getTeam(teamId).pipe(
        map((teamRes) => getTeamSuccess({ message:teamRes.message, team: teamRes.team  })),
        catchError((err) => of(getTeamFailure({ error: err })))
      )
    })
  )
  );
}