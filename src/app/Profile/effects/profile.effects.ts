import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { ProfileService } from "../services/profile.service";
import { getProfile, getProfileFailure, getProfileSuccess, updateProfile, updateProfileFailure, updateProfileSuccess } from "../actions";
import { User } from "../models/user.interface";
import { Router } from "@angular/router";

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private router: Router, 
  ) { }

  getProfile$ = createEffect(() => this.actions$.pipe(
    ofType(getProfile),
    switchMap(() => {
      return this.profileService.getProfile().pipe(
        map((profile) => getProfileSuccess({ profile })),
        catchError((err) => of(getProfileFailure({ error: err })))
      )
    })
  ));

  updateProfile$ = createEffect(() => this.actions$.pipe(
    ofType(updateProfile),
    switchMap(({ name, email, gender, birthdate }) => {
      const updatedUser: User = { name, email, gender, birthdate }
      return this.profileService.updateProfile(updatedUser).pipe(
        map(({ message, user }) => {
          return updateProfileSuccess({ message, user })
        }),

        catchError((err) => {
          return of(updateProfileFailure({ error: err }))
        })
      )
    })
  ));

  updateProfileSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(updateProfileSuccess),
    tap(() => {
      this.router.navigate(['/profile']);
    })
  ), { dispatch: false });
}

