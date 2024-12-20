import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { TeamService } from "../services/team.service";
import { addPlayerToTeam, addPlayerToTeamFailure, addPlayerToTeamSuccess, createTeam, createTeamFailure, createTeamSuccess, deleteTeam, deleteTeamFailure, deleteTeamSuccess, getTeam, getTeamFailure, getTeamSuccess, updateTeam, updateTeamFailure, updateTeamSuccess } from "../actions";
import { Router } from "@angular/router";

@Injectable()
export class TeamEffects {
  constructor(
    private actions$: Actions,
    private teamService: TeamService,
    private router: Router,
  ) { }

  getTeam$ = createEffect(() => this.actions$.pipe(
    ofType(getTeam),
    switchMap(({ teamId }) => {
      return this.teamService.getTeam(teamId).pipe(
        map((teamRes) => getTeamSuccess({ message: teamRes.message, team: teamRes.team })),
        catchError((err) => of(getTeamFailure({ error: err })))
      )
    })
  ));

  createTeam$ = createEffect(() => this.actions$.pipe(
    ofType(createTeam),
    switchMap(({ name, location, contactEmail, userTeamName, userIds }) => {
      return this.teamService.createTeam({ name, location, contactEmail, userTeamName, userIds }).pipe(
        map((response) => {
          return createTeamSuccess({ message: response.message });
        }),
        catchError((err) => {
          return of(createTeamFailure({ error: err }))
        })
      )
    })
  ));

  addPlayerToTeam = createEffect(() => this.actions$.pipe(
    ofType(addPlayerToTeam),
    switchMap(({ email }) => {
      return this.teamService.getPlayerByEmail(email).pipe(
        map((response) => {
          return addPlayerToTeamSuccess({ message: response.message, user: response.user });
        }),
        catchError((err) => {
          return of(addPlayerToTeamFailure({ error: err }))
        })
      )
    })
  ));

  deleteTeam = createEffect(() => this.actions$.pipe(
    ofType(deleteTeam),
    switchMap(({ teamId }) => {
      return this.teamService.deleteTeam(teamId).pipe(
        map((response) => {
          return deleteTeamSuccess({ message: response.message });
        }),
        catchError((err) => {
          return of(deleteTeamFailure({ error: err }))
        })
      )
    })
  ));

  updateTeam = createEffect(() => this.actions$.pipe(
    ofType(updateTeam),
    switchMap(({ teamId, name, contactEmail, location, userIds }) => {
      return this.teamService.updateTeam(teamId, { name, contactEmail, location, userIds }).pipe(
        map(({ message, team }) => {
          return updateTeamSuccess({ message, team })
        }),

        catchError((err) => {
          return of(updateTeamFailure({ error: err }))
        })
      )
    })
  ));

  navigateToMyLeagues = createEffect(() => this.actions$.pipe(
    ofType(createTeamSuccess, deleteTeamSuccess, updateTeamSuccess),
    tap(() => {
      this.router.navigate(['/my-teams']);
    })
  ), { dispatch: false });

}