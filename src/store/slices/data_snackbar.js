import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    snackbar: {
        open: false,
        message: 'Unknown',
        type: 'success',
        maxStack: 3,
        autoHideDuration: 4000
    },
};

const data_snackbar = createSlice({
    name: 'data_snackbar',
    initialState,
    reducers: {
        openSnackbar(state, action) {
            state.snackbar = {...state.snackbar, ...action.payload, open: true};
        },
        closeSnackbar(state) {
            state.snackbar.open = false;
            state.snackbar = initialState.snackbar;
        },
    }
});

export default data_snackbar.reducer;

export const {
    closeSnackbar,
    openSnackbar,
} = data_snackbar.actions;
