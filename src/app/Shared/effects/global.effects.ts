import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as authActions from '../../Auth/actions';
import { AppState } from '../../app.reducer';

@Injectable()
export class GlobalEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>) {}

  clearMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        authActions.loginSuccess,
        authActions.signupSuccess
      ),
      switchMap(() =>
        timer(3000).pipe(
          map(() => authActions.clearMessage()), // Dispatch clearMessage action
          catchError(() => of(authActions.clearMessage())) // Handle errors gracefully
        )
      )
    )
  );

  clearError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        authActions.loginFailure,
        authActions.signupFailure 
      ),
      switchMap(() =>
        timer(3000).pipe(
          map(() => authActions.clearError()),
          catchError(() => of(authActions.clearError()))
        )
      )
    )
  );
}
