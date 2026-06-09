import {createSelector} from "reselect";

const selectDataAuth = (state) => state.data_auth;

export const selectAuthData = createSelector([selectDataAuth], (dataAuth) => {
    return {
        isAuthenticated: dataAuth?.isAuthenticated ?? false,
        roles: dataAuth?.user?.role ? [dataAuth.user.role] : []
    };
});

export const selectAuthChecked = createSelector([selectDataAuth], () => true);
