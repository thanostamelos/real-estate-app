import {createSelector} from 'reselect';

const selectDataMovie = (state) => state.data_movies;

export const selectListDataLoading = createSelector([selectDataMovie], (dataMovie) => dataMovie?.listDataLoading ?? false);

export const selectListData = createSelector([selectDataMovie], (dataMovie) => dataMovie?.listData ?? []);

export const selectSelectedMovie = createSelector([selectDataMovie], (dataMovie) => dataMovie?.selectedMovie ?? null);

