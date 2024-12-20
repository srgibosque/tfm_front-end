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

export const updateProfile = createAction(
  '[PROFILE] Update Profile',
  props<{ name: string, email: string, gender: string, birthdate: string }>()
);

export const updateProfileSuccess = createAction(
  '[PROFILE] Update Profile Success',
  props<{ message: string, user: { name: string, email: string, gender: string, birthdate: string | null } }>()
);

export const updateProfileFailure = createAction(
  '[PROFILE] Update Profile Failure',
  props<{ error: HttpErrorResponse }>()
);