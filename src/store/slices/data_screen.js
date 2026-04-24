import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from "../apiClient";
import {errorMessage, successMessage} from "../responseMessage";

const initialState = {
    createIsLoading: false,
    listData: [],
    listDataLoading: false,
    deleteIsLoading: false,
    updateIsLoading: false,
    selectedScreen: null,
    screenPairsLoading: false,
    screenPairs: [],
};

export const asyncGetAllScreens = createAsyncThunk('data_screen/getAllScreens', async (_, thunkAPI) => {
    try {
        const response = await api.get('/api/screen/getData');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to fetch screens. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncCreateScreen = createAsyncThunk('data_screen/createEvent', async (data, thunkAPI) => {
    try {
        const response = await api.post('/api/screen/create', data);
        await thunkAPI.dispatch(asyncGetAllScreens()).unwrap();
        successMessage(thunkAPI, 'Screen created successfully!');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to create screen. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncDeleteScreen = createAsyncThunk('data_screen/deleteScreen', async (id, thunkAPI) => {
    try {
        const response = await api.delete(`/api/screen/delete/${id}`);
        await thunkAPI.dispatch(asyncGetAllScreens()).unwrap();
        successMessage(thunkAPI, 'Screen deleted successfully!');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to delete screen. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncUpdateScreen = createAsyncThunk('data_screen/updateEvent', async ({id, data}, thunkAPI) => {
    try {
        const response = await api.put(`/api/screen/update/${id}`, data);
        await thunkAPI.dispatch(asyncGetAllScreens()).unwrap();
        successMessage(thunkAPI, 'Screen updated successfully!');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to update screen. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncFindScreenKeyLabels = createAsyncThunk('data_screen/findScreenKeyLabels', async (_, thunkAPI) => {
    try {
        const response = await api.get(`/api/screen/findScreenKeyLabels`);
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to fetch screen pairs. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

const data_screenSlice = createSlice({
    name: 'data_screen',
    initialState,
    reducers: {
        setSelectedScreen: (state, action) => {
            state.selectedScreen = action.payload;
        },
        clearSelectedScreen: (state) => {
            state.selectedScreen = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllScreens.pending, (state) => {
                state.listDataLoading = true;
            })
            .addCase(asyncGetAllScreens.fulfilled, (state, action) => {
                state.listDataLoading = false;
                state.listData = action.payload.map(screen => ({
                    ...screen,
                    createdOn: new Date(screen?.createdOn),
                    updatedOn: new Date(screen?.updatedOn),
                }));
            })
            .addCase(asyncGetAllScreens.rejected, (state) => {
                state.listDataLoading = false;
            })
            .addCase(asyncCreateScreen.pending, (state) => {
                state.createIsLoading = true;
            })
            .addCase(asyncCreateScreen.fulfilled, (state) => {
                state.createIsLoading = false;
            })
            .addCase(asyncCreateScreen.rejected, (state) => {
                state.createIsLoading = false;
            })
            .addCase(asyncDeleteScreen.pending, (state) => {
                state.deleteIsLoading = true;
            })
            .addCase(asyncDeleteScreen.fulfilled, (state) => {
                state.deleteIsLoading = false;
            })
            .addCase(asyncDeleteScreen.rejected, (state) => {
                state.deleteIsLoading = false;
            })
            .addCase(asyncUpdateScreen.pending, (state) => {
                state.updateIsLoading = true;
            })
            .addCase(asyncUpdateScreen.fulfilled, (state) => {
                state.updateIsLoading = false;
            })
            .addCase(asyncUpdateScreen.rejected, (state) => {
                state.updateIsLoading = false;
            })
            .addCase(asyncFindScreenKeyLabels.pending, (state) => {
                state.screenPairsLoading = true;
            })
            .addCase(asyncFindScreenKeyLabels.fulfilled, (state, action) => {
                state.screenPairsLoading = false;
                state.screenPairs = action.payload;
            })
            .addCase(asyncFindScreenKeyLabels.rejected, (state) => {
                state.screenPairsLoading = false;
            });
    }
});

export const {setSelectedScreen, clearSelectedScreen} = data_screenSlice.actions;
export default data_screenSlice.reducer;