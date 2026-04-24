import {createSelector} from "reselect";

const selectDataEntryLog = (state) => state.data_entryLog;

export const selectAllEntriesLoading = createSelector([selectDataEntryLog], (dataEntryLog) => dataEntryLog?.allEntriesLoading ?? false);

export const selectAllEntries = createSelector([selectDataEntryLog], (dataEntryLog) => dataEntryLog?.allEntries ?? []);
