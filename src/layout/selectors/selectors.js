import {createSelector} from 'reselect';

const selectDataMenu = (state) => state.data_menu;

export const selectIsOpen = createSelector([selectDataMenu], (dataMenu) => dataMenu?.open ?? false);


const selectDataAuth = (state) => state.data_auth;

export const selectCurrentAuthData = createSelector([selectDataAuth], (dataAuth) => dataAuth?.authData ?? null);
