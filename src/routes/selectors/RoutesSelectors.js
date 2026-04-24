import {createSelector} from "reselect";

const selectDataAuth = (state) => state.data_auth;

export const selectAuthData = createSelector([selectDataAuth], (dataAuth) => dataAuth?.authData ?? null);

export const selectAuthChecked = createSelector([selectDataAuth], (dataAuth) => dataAuth?.authChecked ?? false);
