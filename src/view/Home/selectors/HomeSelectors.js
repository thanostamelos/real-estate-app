import {createSelector} from "reselect";

const selectDataSearchbar = (state) => state.data_searchbar;

export const selectSearchTerm = createSelector([selectDataSearchbar], (s) => s?.searchTerm ?? '');
export const selectLocation = createSelector([selectDataSearchbar], (s) => s?.location ?? '');
export const selectPropertyType = createSelector([selectDataSearchbar], (s) => s?.propertyType ?? '');
export const selectStatus = createSelector([selectDataSearchbar], (s) => s?.status ?? '');
export const selectMinPrice = createSelector([selectDataSearchbar], (s) => s?.minPrice ?? '');
export const selectMaxPrice = createSelector([selectDataSearchbar], (s) => s?.maxPrice ?? '');
