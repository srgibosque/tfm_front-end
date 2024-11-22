import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "../reducers";

export const selectProfileAppState = createFeatureSelector<ProfileState>('profileApp');

export const selectUserData = createSelector(
  selectProfileAppState,
  (state: ProfileState) => state?.data?.user?.userData
);