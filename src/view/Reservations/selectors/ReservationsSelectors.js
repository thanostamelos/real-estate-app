import {createSelector} from 'reselect';

const selectDataReservation = (state) => state.data_reservation;

export const selectMyReservationsLoading = createSelector([selectDataReservation], (dataReservation) => dataReservation?.myReservationsLoading ?? false);

export const selectMyReservations = createSelector([selectDataReservation], (dataReservation) => dataReservation?.myReservations ?? []);

export const selectSelectedReservation = createSelector([selectDataReservation], (dataReservation) => dataReservation?.selectedReservation ?? null);

export const selectSelectedScreening = createSelector([selectDataReservation], (dataReservation) => dataReservation?.selectedScreening ?? null);

export const selectCreateIsLoading = createSelector([selectDataReservation], (dataReservation) => dataReservation?.createIsLoading ?? false);


// CALENDAR SELECTORS

const selectDataCalendar = (state) => state.data_calendar;

export const selectCalendarLoading = createSelector([selectDataCalendar], (dataCalendar) => dataCalendar?.listDataLoading ?? false);

export const selectCalendar = createSelector([selectDataCalendar], (dataCalendar) => dataCalendar?.listData ?? []);
