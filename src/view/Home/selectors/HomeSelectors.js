import {createSelector} from "reselect";

const selectDataAuth = (state) => state.data_auth;

export const selectAuthData = createSelector([selectDataAuth], (dataAuth) => dataAuth?.authData ?? null);

export const selectCreateAccountData = createSelector([selectDataAuth], (dataAuth) => dataAuth?.createResponse ?? null);


// CALENDAR
const selectDataCalendar = (state) => state.data_calendar;

export const selectCalendarLoading = createSelector([selectDataCalendar], (dataCalendar) => dataCalendar?.listDataLoading ?? false);

export const selectCalendar = createSelector([selectDataCalendar], (dataCalendar) => dataCalendar?.listData ?? []);
