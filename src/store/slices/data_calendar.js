import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from "../apiClient";
import {errorMessage, successMessage} from "../responseMessage";

const initialState = {
    createIsLoading: false,
    deleteIsLoading: false,
    updateIsLoading: false,
    listData: [],
    listDataLoading: false,
    eventsForCheckInLoading: false,
    eventsForCheckIn: [],
};

export const asyncGetAllEvent = createAsyncThunk('data_calendar/getData', async (_, thunkAPI) => {
    try {
        const response = await api.get('/api/calendar/getData');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to fetch events. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncGetEventsForCheckIn = createAsyncThunk('data_calendar/getEventsForCheckIn', async (_, thunkAPI) => {
    try {
        const response = await api.get('/api/calendar/getEventsForCheckIn');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to fetch events. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncCreateMonitoring = createAsyncThunk('data_calendar/createMonitoring', async (data, thunkAPI) => {
    try {
        const response = await api.post('/api/admin/calendar/create', data);
        await thunkAPI.dispatch(asyncGetAllEvent()).unwrap();
        successMessage(thunkAPI, 'Created event successfully!');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to create event. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncUpdateEvent = createAsyncThunk('data_calendar/updateEvent', async ({id, request}, thunkAPI) => {
    try {
        const response = await api.put(`/api/admin/calendar/update/${id}`, request);
        await thunkAPI.dispatch(asyncGetAllEvent()).unwrap();
        successMessage(thunkAPI, 'Update event successfully!');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to update event. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncDeleteEvent = createAsyncThunk('data_calendar/deleteEvent', async (id, thunkAPI) => {
    try {
        const response = await api.delete(`/api/admin/calendar/delete/${id}`);
        await thunkAPI.dispatch(asyncGetAllEvent()).unwrap();
        successMessage(thunkAPI, 'Delete event successfully!');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to delete event. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

const data_calendarSlice = createSlice({
    name: 'data_calendar',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllEvent.pending, (state) => {
                state.listDataLoading = true;
            })
            .addCase(asyncGetAllEvent.fulfilled, (state, action) => {
                state.listDataLoading = false;
                state.listData = action.payload;
            })
            .addCase(asyncGetAllEvent.rejected, (state) => {
                state.listDataLoading = false;
            })
            .addCase(asyncGetEventsForCheckIn.pending, (state) => {
                state.eventsForCheckInLoading = true;
            })
            .addCase(asyncGetEventsForCheckIn.fulfilled, (state, action) => {
                state.eventsForCheckInLoading = false;
                state.eventsForCheckIn = action.payload;
            })
            .addCase(asyncGetEventsForCheckIn.rejected, (state) => {
                state.eventsForCheckInLoading = false;
            })
            .addCase(asyncCreateMonitoring.pending, (state) => {
                state.createIsLoading = true;
            })
            .addCase(asyncCreateMonitoring.fulfilled, (state) => {
                state.createIsLoading = false;
            })
            .addCase(asyncCreateMonitoring.rejected, (state) => {
                state.createIsLoading = false;
            })
            .addCase(asyncUpdateEvent.pending, (state) => {
                state.updateIsLoading = true;
            })
            .addCase(asyncUpdateEvent.fulfilled, (state) => {
                state.updateIsLoading = false;
            })
            .addCase(asyncUpdateEvent.rejected, (state) => {
                state.updateIsLoading = false;
            })
            .addCase(asyncDeleteEvent.pending, (state) => {
                state.deleteIsLoading = true;
            })
            .addCase(asyncDeleteEvent.fulfilled, (state) => {
                state.deleteIsLoading = false;
            })
            .addCase(asyncDeleteEvent.rejected, (state) => {
                state.deleteIsLoading = false;
            });
    }
});

export const {} = data_calendarSlice.actions;
export default data_calendarSlice.reducer;