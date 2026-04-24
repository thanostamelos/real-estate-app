import {createSelector} from "reselect";

const selectDataCalendar = (state) => state.data_calendar;

export const selectCalendarLoading = createSelector([selectDataCalendar], (dataCalendar) => dataCalendar?.eventsForCheckInLoading ?? false);

export const selectCalendar = createSelector([selectDataCalendar], (dataCalendar) => dataCalendar?.eventsForCheckIn ?? []);


const selectDataEntryLog = (state) => state.data_entryLog;

export const selectEnterCinemaLoading = createSelector([selectDataEntryLog], (dataEntryLog) => dataEntryLog?.enterCinemaLoading ?? false);
export const selectEnterCinemaData = createSelector([selectDataEntryLog], (dataEntryLog) => dataEntryLog?.enterCinemaResponse ?? null);


const selectDataReservations = (state) => state.data_reservation;

export const selectSearchReservation = createSelector([selectDataReservations], (dataReservations) => dataReservations?.searchReservation ?? []);

export const selectSearchReservationLoading = createSelector([selectDataReservations], (dataReservations) => dataReservations?.searchReservationLoading ?? false);

export const selectReservationById = createSelector([selectDataReservations], (dataReservations) => dataReservations?.reservationById ?? null);

export const selectReservationByIdLoading = createSelector([selectDataReservations], (dataReservations) => dataReservations?.reservationByIdLoading ?? false);

