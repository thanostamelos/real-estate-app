import {createSelector} from "reselect";

const selectDataSearchbar = (state) => state.data_searchbar;

export const selectSearchTerm = createSelector([selectDataSearchbar], (dataSearchbar) => dataSearchbar?.searchTerm ?? '');

export const selectLocation = createSelector([selectDataSearchbar], (dataSearchbar) => dataSearchbar?.location ?? '');

