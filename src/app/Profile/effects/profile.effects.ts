import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ProfileService } from "../services/profile.service";
import { getProfile, getProfileFailure, getProfileSuccess, updateProfile, updateProfileFailure, updateProfileSuccess } from "../actions";
import { User } from "../models/user.interface";

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
  ) { }

  getProfile$ = createEffect(() => this.actions$.pipe(
    ofType(getProfile),
    switchMap(() => {
      return this.profileService.getProfile().pipe(
        map((profile) => getProfileSuccess({ profile })),
        catchError((err) => of(getProfileFailure({ error: err })))
      )
    })
  )
  );

  updateProdile$ = createEffect(() => this.actions$.pipe(
    ofType(updateProfile),
    switchMap(({ name, email, gender, birthdate }) => {
      const updatedUser: User = { name, email, gender, birthdate }
      return this.profileService.updateProfile(updatedUser).pipe(
        map(({ message, user }) => {
          return updateProfileSuccess({ message, user})
        }),

        catchError((err) => {
          return of(updateProfileFailure({ error: err }))
        })
      )
    })
  ));
}

