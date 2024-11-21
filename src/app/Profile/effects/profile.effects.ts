import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ProfileService } from "../services/profile.service";
import { getProfile, getProfileFailure, getProfileSuccess } from "../actions";

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
}

