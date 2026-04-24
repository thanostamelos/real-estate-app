import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from "../apiClient";
import {errorMessage, successMessage} from "../responseMessage";

const initialState = {
    createIsLoading: false,
    listData: [],
    listDataLoading: false,
    myReservations: [],
    myReservationsLoading: false,
    selectedScreening: null,
    searchReservation: [],
    searchReservationLoading: false,
    reservationById: null,
    reservationByIdLoading: false,
};

export const asyncGetAllRecords = createAsyncThunk('data_reservation/getAllRecords', async (_, thunkAPI) => {
    try {
        const response = await api.get('/api/reservation/getAllRecords');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to fetch records. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncGetMyRecords = createAsyncThunk('data_reservation/getMyRecords', async (_, thunkAPI) => {
    try {
        const response = await api.get('/api/reservation/my-records');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to fetch records. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncCreateRecord = createAsyncThunk('data_reservation/createRecord', async (data, thunkAPI) => {
    try {
        const response = await api.post('/api/reservation/create', data);
        await thunkAPI.dispatch(asyncGetMyRecords()).unwrap();
        successMessage(thunkAPI, 'Created record successfully!');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to create record. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncSearchReservation = createAsyncThunk('data_reservation/searchReservation', async (data, thunkAPI) => {
    try {
        const response = await api.post('/api/reservation/search-reservation', {
            phone: data?.phone || null,
            email: data?.email || null
        });
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to fetch reservations. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncFindReservationById = createAsyncThunk('data_reservation/findById', async (objectId, thunkAPI) => {
    try {
        const response = await api.post('/api/reservation/findById', objectId);
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to fetch reservation. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

const data_reservationSlice = createSlice({
    name: 'data_reservation',
    initialState,
    reducers: {
        setSelectedScreening: (state, action) => {
            state.selectedScreening = action.payload;
        },
        emptySearchReservation: (state) => {
            state.searchReservation = [];
        },
        emptyFindById: (state) => {
            state.reservationById = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllRecords.pending, (state) => {
                state.listDataLoading = true;
            })
            .addCase(asyncGetAllRecords.fulfilled, (state, action) => {
                state.listDataLoading = false;
                state.listData = action.payload;
            })
            .addCase(asyncGetAllRecords.rejected, (state) => {
                state.listDataLoading = false;
            })
            .addCase(asyncGetMyRecords.pending, (state) => {
                state.myReservationsLoading = true;
            })
            .addCase(asyncGetMyRecords.fulfilled, (state, action) => {
                state.myReservationsLoading = false;
                state.myReservations = action.payload;
            })
            .addCase(asyncGetMyRecords.rejected, (state) => {
                state.myReservationsLoading = false;
            })
            .addCase(asyncCreateRecord.pending, (state) => {
                state.createIsLoading = true;
            })
            .addCase(asyncCreateRecord.fulfilled, (state) => {
                state.createIsLoading = false;
            })
            .addCase(asyncCreateRecord.rejected, (state) => {
                state.createIsLoading = false;
            })
            .addCase(asyncSearchReservation.pending, (state) => {
                state.searchReservationLoading = true;
            })
            .addCase(asyncSearchReservation.fulfilled, (state, action) => {
                state.searchReservation = action.payload;
                state.searchReservationLoading = false;
            })
            .addCase(asyncSearchReservation.rejected, (state) => {
                state.searchReservationLoading = false;
            })
            .addCase(asyncFindReservationById.pending, (state) => {
                state.reservationByIdLoading = true;
            })
            .addCase(asyncFindReservationById.fulfilled, (state, action) => {
                state.reservationById = action.payload;
                state.reservationByIdLoading = false;
            })
            .addCase(asyncFindReservationById.rejected, (state) => {
                state.reservationByIdLoading = false;
            });
    }
});

export const {setSelectedScreening, emptySearchReservation, emptyFindById} = data_reservationSlice.actions;
export default data_reservationSlice.reducer;