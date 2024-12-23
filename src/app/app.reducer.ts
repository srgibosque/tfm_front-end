import { ActionReducerMap } from '@ngrx/store';
import * as authReducers from './Auth/reducers';
import * as profileReducers from './Profile/reducers';
import * as teamReducers from './Team/reducers';
import * as leagueReducers from './League/reducers';
import * as matchReducers from './Match/reducers';

export interface AppState {
  authApp: authReducers.AuthState;
  profileApp: profileReducers.ProfileState;
  teamApp: teamReducers.TeamState;
  leagueApp: leagueReducers.LeagueState;
  matchApp: matchReducers.MatchState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authApp: authReducers.authReducer,
  profileApp: profileReducers.profileReducer,
  teamApp: teamReducers.teamReducer,
  leagueApp: leagueReducers.leagueReducer,
  matchApp: matchReducers.matchReducer,
}