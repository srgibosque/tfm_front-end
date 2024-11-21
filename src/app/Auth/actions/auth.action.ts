import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

//LOG IN
export const autoLogin = createAction('[AUTH] Auto login')

export const login = createAction(
  '[AUTH] Login',
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  '[AUTH] Login success',
  props<{ userId: number, token: string }>()
);

export const loginFailure = createAction(
  '[AUTH] Login failure',
  props<{ payload: HttpErrorResponse }>()
);

//SIGN UP
export const signup = createAction(
  '[AUTH] Signup',
  props<{ email: string, name: string, gender: "male" | "female" | undefined, birthdate: Date | null, password: string }>()
);

export const signupSuccess = createAction(
  '[AUTH] Signup success',
  props<{ message: string }>()
);

export const signupFailure = createAction(
  '[AUTH] Signup failure',
  props<{ payload: HttpErrorResponse }>()
);

//LOGOUT
export const logout = createAction(
  '[AUTH] Logout'
);