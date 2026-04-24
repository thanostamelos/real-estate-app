import {createSelector} from "reselect";

const selectDataSnackbar = (state) => state.data_snackbar;

export const selectSnackbarDataInfo = createSelector([selectDataSnackbar], (dataSnackbar) => dataSnackbar?.snackbar ?? null);
