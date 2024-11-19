import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";

import { AuthService } from "../services/auth.service";
import { LocalStorageService } from "../../Shared/services/local-storage.service";
import { login, loginFailure, loginSuccess, signup, signupFailure, signupSuccess } from "../actions";
import { AuthDTO } from "../models/auth.dto";
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }

  login$ = createEffect(() => this.actions$.pipe(
    // ofType filters in which actions the effect triggers
    ofType(login),
    // Transforms the incoming action into a new observable (A req to the API)
    switchMap(({ email, password }) => {

      const loginUser: AuthDTO = { email: email, password: password, userId: null, token: null };

      return this.authService.login(loginUser).pipe(
        //Transforms the http response, in the same observable
        map((accessInfo) => {
          return loginSuccess({ userId: accessInfo.userId, token: accessInfo.token });
        }),

        catchError((err) => {
          return of(loginFailure({ payload: err }))
        })
      )
    })
  )
  );

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    tap((accessInfo) => {
      this.localStorageService.set('token', accessInfo.token);
      this.router.navigate(['/']);
    })
  ), { dispatch: false });

  signup$ = createEffect(() => this.actions$.pipe(
    // ofType filters in which actions the effect triggers
    ofType(signup),
    // Transforms the incoming action into a new observable (A req to the API)
    switchMap(({ name, email, password, birthdate, gender }) => {

      return this.authService.signup({ id: undefined, name, email, password, birthdate, gender }).pipe(
        //Transforms the http response, in the same observable
        map((response) => {
          return signupSuccess({ message: response.message });
        }),

        catchError((err) => {
          return of(signupFailure({ payload: err }))
        })
      )
    })
  )
  );

  signupSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(signupSuccess),
    tap(() => {
      this.router.navigate(['/login']);
    })
  ), { dispatch: false });

}

