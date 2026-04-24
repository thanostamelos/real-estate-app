import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
};

const data_menuSlice = createSlice({
    name: 'data_menu',
    initialState,
    reducers: {
        setIsOpen: (state, action) => {
            state.open = action.payload;
        },
    },
});

export const { setIsOpen } = data_menuSlice.actions;
export default data_menuSlice.reducer;