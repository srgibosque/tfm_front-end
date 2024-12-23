import { createReducer, on } from "@ngrx/store";
import { clearError, clearMessage, getProfile, getProfileFailure, getProfileSuccess, updateProfile, updateProfileFailure, updateProfileSuccess } from "../actions";
import { Profile } from '../services/profile.service';

export interface ProfileState {
  data: Profile;
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

  on(updateProfile, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    message: null,
  })),

  on(updateProfileSuccess, (state, { message, user }) => ({
    ...state,
    loading: false,
    loaded: true,
    message: message,
    data: {
      ...state.data,
      user: {
        ...state.data.user, 
        userData: {
          ...state.data.user.userData, 
          name: user.name, 
          email: user.email, 
          gender: user.gender, 
          birthdate: user.birthdate, 
        },
      },
    },
  })),

  on(updateProfileFailure, (state, {error}) => ({
    ...state,
    loaded: false,
    loading: false,
    error: error,
  })),

    //CLEAR MESSAGES AND ERRORS
    on(clearMessage, (state) => ({ ...state, message: null })),
    on(clearError, (state) => ({ ...state, error: null }))
);