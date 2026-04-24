import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from "../apiClient";
import {errorMessage} from "../responseMessage";

const initialState = {
    allEntries: [],
    allEntriesLoading: false,
    enterCinemaLoading: false,
    enterCinemaResponse: null,
};

export const asyncEnterCinema = createAsyncThunk('data_entryLog/checkIn', async (data, thunkAPI) => {
    try {
        const response = await api.post('/api/entry-log/enter-cinema', data);
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to entered. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

// ADMIN-USE
export const asyncGetAllEntries = createAsyncThunk('data_entryLog/getAllEntries', async (calendarId, thunkAPI) => {
    try {
        const response = await api.get('/api/entry-log/admin/getAllEntriesLog');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to fetch log entries. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});


const data_entryLogSlice = createSlice({
    name: 'data_entryLog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllEntries.pending, (state) => {
                state.allEntriesLoading = true;
            })
            .addCase(asyncGetAllEntries.fulfilled, (state, action) => {
                state.allEntriesLoading = false;
                state.allEntries = action.payload;
            })
            .addCase(asyncGetAllEntries.rejected, (state) => {
                state.allEntriesLoading = false;
            })
            .addCase(asyncEnterCinema.pending, (state) => {
                state.enterCinemaLoading = true;
            })
            .addCase(asyncEnterCinema.fulfilled, (state, action) => {
                state.enterCinemaLoading = false;
                state.enterCinemaResponse = action.payload;
            })
            .addCase(asyncEnterCinema.rejected, (state) => {
                state.enterCinemaLoading = false;
            });
    }
});

export const {} = data_entryLogSlice.actions;
export default data_entryLogSlice.reducer;