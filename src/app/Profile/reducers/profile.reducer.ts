import { getProfileFailure } from './../actions/profile.action';
import { ProfileComponent } from './../components/profile/profile.component';
import { createReducer, on } from "@ngrx/store";
import { getProfile, getProfileSuccess } from "../actions";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "../models/user.interface";
import { Profile } from '../services/profile.service';

export interface ProfileState {
  data: Profile ;
  loading: boolean;
  loaded: boolean;
  error: any;
  message: string | null;
}

export const initialState: ProfileState = {
  data: {
    user: {
      userData: {
        id: undefined,
        name: '',
        email: '',
        gender: '',
        birthdate: null,
        createdAt: '',
        updatedAt: '',
      },
      teams: [],
      leagues: [],
      matches: []
    }
  },
  loading: false,
  loaded: false,
  error: null,
  message: null,
};

export const profileReducer = createReducer(
  initialState,
  on(getProfile, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),

  on(getProfileSuccess, (state, { profile }) => ({
    ...state,
    loaded: true,
    loading: false,
    data: {
      ...state.data,
      user: {
        ...profile.user,
      }
    }
  })),

  on(getProfileFailure, (state, { error }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: error,
  })),
);