import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Profile } from "../services/profile.service";

export const getProfile = createAction('[PROFILE] Get Profile');

export const getProfileSuccess = createAction(
  '[PROFILE] Get Profile Success',
  props<{ profile: Profile }>()
);

export const getProfileFailure = createAction(
  '[PROFILE] Get Profile Failure',
  props<{ error: HttpErrorResponse }>()
);