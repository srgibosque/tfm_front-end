import { ActionReducerMap } from '@ngrx/store';
import * as authReducers from './Auth/reducers';
import * as profileReducers from './Profile/reducers';

export interface AppState {
  authApp: authReducers.AuthState;
  profileApp: profileReducers.ProfileState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authApp: authReducers.authReducer,
  profileApp: profileReducers.profileReducer,
}