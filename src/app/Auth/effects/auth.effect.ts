import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";

import { AuthService } from "../services/auth.service";
import { login, loginFailure, loginSuccess } from "../actions";
import { AuthDTO } from "../models/auth.dto";
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ){}

  login$ = createEffect(() => this.actions$.pipe(
      ofType(login),
      mergeMap(({email, password}) => {

        const loginUser: AuthDTO = {email: email, password: password, userId: null, token: null};

        return this.authService.login(loginUser).pipe(
          map((accessInfo) => {
            return loginSuccess({user_id: accessInfo.userId, access_token: accessInfo.token});
          }),

          catchError((err) => {
            return of(loginFailure({payload: err}))
          })
        )
      })
    )
  )
}

        