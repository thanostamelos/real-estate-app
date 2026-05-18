import {createSlice} from '@reduxjs/toolkit';

// Αντιστοιχεί στην κλάση SearchProperty του UML
const initialState = {
    searchTerm: '',
    location: '',
    propertyType: '',
    status: '',
    minPrice: '',
    maxPrice: ''
};

const data_searchbar = createSlice({
    name: 'data_searchbar',
    initialState,
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        setLocationTerm(state, action) {
            state.location = action.payload;
        },
        setPropertyType(state, action) {
            state.propertyType = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setMinPrice(state, action) {
            state.minPrice = action.payload;
        },
        setMaxPrice(state, action) {
            state.maxPrice = action.payload;
        },
        resetFilter(state) {
            state.searchTerm = '';
            state.location = '';
            state.propertyType = '';
            state.status = '';
            state.minPrice = '';
            state.maxPrice = '';
        }
    }
});

export default data_searchbar.reducer;

export const {
    setSearchTerm,
    setLocationTerm,
    setPropertyType,
    setStatus,
    setMinPrice,
    setMaxPrice,
    resetFilter
} = data_searchbar.actions;
