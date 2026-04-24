import {createSelector} from 'reselect';

const selectDataReservation = (state) => state.data_reservation;

export const selectReservationsLoading = createSelector([selectDataReservation], (dataReservation) => dataReservation?.listDataLoading ?? false);

export const selectReservations = createSelector([selectDataReservation], (dataReservation) => dataReservation?.listData ?? []);
