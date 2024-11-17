import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
  '[AUTH] Login',
  props<{email: string, password: string}>()
)

export const loginSuccess = createAction(
  '[AUTH] Login success',
  props<{userId: number , token: string}>()
)

export const loginFailure = createAction(
  '[AUTH] Login failure',
  props<{payload: HttpErrorResponse}>()
)