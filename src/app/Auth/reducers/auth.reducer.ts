import { createReducer, on } from "@ngrx/store";
import { clearError, clearMessage, login, loginFailure, loginSuccess, logout, signup, signupFailure, signupSuccess } from "../actions";

export interface Credentials {
  userId: number | null;
  token: string | null;
}

export interface AuthState {
  credentials: Credentials;
  loading: boolean;
  loaded: boolean;
  error: any;
  message: string | null;
}

export const initialState: AuthState = {
  credentials: { userId: null, token: null },
  loading: false,
  loaded: false,
  error: null,
  message: null,
}

//LOGIN
export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),

  on(loginSuccess, (state, { userId, token }) => ({
    ...state,
    loading: false,
    loaded: true,
     message: 'Login successful',
    credentials: {
      ...state.credentials,
      userId: userId,
      token: token
    }
  })),

  on(loginFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload
  })),

  //SIGN UP
  on(signup, (state) => ({
    ...state,
    loading: true,
    loaded: false
  })),

  on(signupSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    loaded: true,
    message: message
  })),

  on(signupFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload
  })),

  //LOGOUT
  on(logout, (state) => ({
    ...state,
    loading: false,
    loaded: false,
    credentials: { userId: null, token: null },
    message: 'Logout successful'
  })),

  //CLEAR MESSAGES AND ERRORS
  on(clearMessage, (state) => ({ ...state, message: null })),
  on(clearError, (state) => ({ ...state, error: null }))
);