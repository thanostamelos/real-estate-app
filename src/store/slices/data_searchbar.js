import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    searchTerm: '',
    location: ''
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
        }
    }
});

export default data_searchbar.reducer;

export const {setSearchTerm, setLocationTerm} = data_searchbar.actions;
