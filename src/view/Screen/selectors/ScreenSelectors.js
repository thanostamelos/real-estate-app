import {createSelector} from 'reselect';

const selectDataScreen = (state) => state.data_screen;

export const selectListDataLoading = createSelector([selectDataScreen], (dataScreen) => dataScreen?.listDataLoading ?? false);

export const selectListData = createSelector([selectDataScreen], (dataScreen) => dataScreen?.listData ?? []);

export const selectSelectedScreen = createSelector([selectDataScreen], (dataScreen) => dataScreen?.selectedScreen ?? null);

