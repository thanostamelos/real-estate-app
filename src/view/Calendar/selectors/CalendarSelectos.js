import {createSelector} from 'reselect';

const selectDataReservation = (state) => state.data_reservation;
export const selectCreateIsLoading = createSelector([selectDataReservation], (dataReservation) => dataReservation?.createIsLoading ?? false);

export const selectUpdateIsLoading = createSelector([selectDataReservation], (dataReservation) => dataReservation?.updateIsLoading ?? false);

export const selectDeleteIsLoading = createSelector([selectDataReservation], (dataReservation) => dataReservation?.deleteIsLoading ?? false);

const selectDataAuth = (state) => state.data_auth;

export const selectCurrentAuthData = createSelector([selectDataAuth], (dataAuth) => dataAuth?.authData ?? null);



// MOVIES
const selectDataMovies = (state) => state.data_movies;

export const selectMoviePairsLoading = createSelector([selectDataMovies], (dataMovies) => dataMovies?.moviePairsLoading ?? false);

export const selectMoviePairs = createSelector([selectDataMovies], (dataMovies) => dataMovies?.moviePairs ?? []);


// SCREENS
const selectDataScreens = (state) => state.data_screen;

export const selectScreenPairsLoading = createSelector([selectDataScreens], (dataScreens) => dataScreens?.screenPairsLoading ?? false);

export const selectScreenPairs = createSelector([selectDataScreens], (dataScreens) => dataScreens?.screenPairs ?? []);

// Calendar
const selectDataCalendar = (state) => state.data_calendar;

export const selectCalendarCreateLoading = createSelector([selectDataCalendar], (dataCalendar) => dataCalendar?.createIsLoading ?? false);

export const selectCalendarDeleteLoading = createSelector([selectDataCalendar], (dataCalendar) => dataCalendar?.deleteIsLoading ?? false);

export const selectCalendarUpdateLoading = createSelector([selectDataCalendar], (dataCalendar) => dataCalendar?.updateIsLoading ?? false);

export const selectListDataLoading = createSelector([selectDataCalendar], (dataCalendar) => dataCalendar?.listDataLoading ?? false);

export const selectListData = createSelector([selectDataCalendar], (dataCalendar) => dataCalendar?.listData ?? []);
