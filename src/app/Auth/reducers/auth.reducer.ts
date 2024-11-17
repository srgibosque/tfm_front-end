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

  on(loginSuccess, (state, { userId, token }) => ({
    ...state,
    loading: false,
    loaded: true,
    credentials: {
      ...state.credentials,
      userId: userId,
      token: token
    }
  })),
  
  on(loginFailure, (state, {payload}) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload
  })),
);