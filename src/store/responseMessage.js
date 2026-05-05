import {openSnackbar} from "./slices/data_snackbar";

export const errorMessage = (thunkAPI, error, userMessage) => {
    const message = thunkAPI.rejectWithValue(error)?.payload?.response?.data?.message;

    thunkAPI.dispatch(
        openSnackbar({
            message: message || userMessage || 'Something went wrong. Please try again.',
            type: 'error',
            autoHideDuration: 2500
        })
    );
}

export const successMessage = (thunkAPI, userMessage) => {
    thunkAPI.dispatch(
        openSnackbar({
            message: userMessage || 'Action completed successfully!',
            type: 'success',
            autoHideDuration: 2500
        })
    );
}