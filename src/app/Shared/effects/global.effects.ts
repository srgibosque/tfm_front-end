import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AppState } from '../../app.reducer';
import * as authActions from '../../Auth/actions';
import * as profileActions from '../../Profile/actions';
import * as teamActions from '../../Team/actions';
import * as leagueActions from '../../League/actions';
import * as matchActions from '../../Match/actions';

@Injectable()
export class GlobalEffects {
  time: number = 3000;

  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  // AUTH
  clearAuthMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        authActions.loginSuccess,
        authActions.signupSuccess,
      ),
      switchMap(() =>
        timer(this.time).pipe(
          map(() => authActions.clearMessage()),
          catchError(() => of(authActions.clearMessage())) 
        )
      )
    )
  );

  clearAuthError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        authActions.loginFailure,
        authActions.signupFailure 
      ),
      switchMap(() =>
        timer(this.time).pipe(
          map(() => authActions.clearError()),
          catchError(() => of(authActions.clearError()))
        )
      )
    )
  );

  // PROFILE
  clearProfileMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        profileActions.updateProfileSuccess
      ),
      switchMap(() =>
        timer(this.time).pipe(
          map(() => profileActions.clearMessage()),
          catchError(() => of(profileActions.clearMessage())) 
        )
      )
    )
  );

  clearProfileError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        profileActions.getProfileFailure,
        profileActions.updateProfileFailure
      ),
      switchMap(() =>
        timer(this.time).pipe(
          map(() => profileActions.clearError()),
          catchError(() => of(profileActions.clearError()))
        )
      )
    )
  );

  // TEAM
  clearTeamMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        teamActions.addPlayerToTeamSuccess,
        teamActions.createTeamSuccess,
        teamActions.updateTeamSuccess,
        teamActions.deleteTeamSuccess
      ),
      switchMap(() =>
        timer(this.time).pipe(
          map(() => teamActions.clearMessage()),
          catchError(() => of(teamActions.clearMessage())) 
        )
      )
    )
  );

  clearTeamError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        teamActions.addPlayerToTeamFailure,
        teamActions.createTeamFailure,
        teamActions.updateTeamFailure,
        teamActions.deleteTeamFailure,
        teamActions.getTeamFailure
      ),
      switchMap(() =>
        timer(this.time).pipe(
          map(() => teamActions.clearError()),
          catchError(() => of(teamActions.clearError()))
        )
      )
    )
  );

  // LEAGUE
  clearLeagueMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        leagueActions.addTeamToLeagueSuccess,
        leagueActions.createLeagueSuccess,
        leagueActions.deleteLeagueSuccess
      ),
      switchMap(() =>
        timer(this.time).pipe(
          map(() => leagueActions.clearMessage()),
          catchError(() => of(leagueActions.clearMessage())) 
        )
      )
    )
  );

  clearLeagueError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        leagueActions.addTeamToLeagueFailure,
        leagueActions.createLeagueFailure,
        leagueActions.deleteLeagueFailure,
        leagueActions.getLeagueFailure,
        leagueActions.getLeagueTableFailure
      ),
      switchMap(() =>
        timer(this.time).pipe(
          map(() => leagueActions.clearError()),
          catchError(() => of(leagueActions.clearError()))
        )
      )
    )
  );

  // MATCH
  clearMatchMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        matchActions.updateMatchSuccess
      ),
      switchMap(() =>
        timer(this.time).pipe(
          map(() => matchActions.clearMessage()),
          catchError(() => of(matchActions.clearMessage())) 
        )
      )
    )
  );

  clearMatchError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        matchActions.updateMatchFailure,
        matchActions.getMatchFailure
      ),
      switchMap(() =>
        timer(this.time).pipe(
          map(() => matchActions.clearError()),
          catchError(() => of(matchActions.clearError()))
        )
      )
    )
  );

}
