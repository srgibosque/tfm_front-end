import { ActionReducerMap } from '@ngrx/store';
import * as authReducers from './Auth/reducers';
import * as profileReducers from './Profile/reducers';
import * as teamReducers from './Team/reducers';

export interface AppState {
  authApp: authReducers.AuthState;
  profileApp: profileReducers.ProfileState;
  teamApp: teamReducers.TeamState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authApp: authReducers.authReducer,
  profileApp: profileReducers.profileReducer,
  teamApp: teamReducers.teamReducer,
}