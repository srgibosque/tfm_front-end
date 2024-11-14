import { createReducer, on } from "@ngrx/store";
import { AuthDTO } from "../models/auth.dto";
import { login, loginFailure, loginSuccess } from "../actions";

export interface AuthState {
  credentials: AuthDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AuthState = {
  credentials: new AuthDTO(null, null, '', ''),
  loading: false,
  loaded: false,
  error: null
}

export const authReducer = createReducer(
  initialState,
  on(login, (state, { email, password }) => ({
    ...state,
    loading: true,
    loaded: false,
    credentials: {
      ...state.credentials,
      email: email,
      password: password
    }
  })),

  on(loginSuccess, (state, { user_id, access_token }) => ({
    ...state,
    loading: false,
    loaded: true,
    credentials: {
      ...state.credentials,
      user_id: user_id,
      access_token: access_token
    }
  })),
  
  on(loginFailure, (state, {payload}) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload
  })),
);