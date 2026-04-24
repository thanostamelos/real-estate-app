import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from "../apiClient";
import {errorMessage, successMessage} from "../responseMessage";

const initialState = {
    isLoading: false,
    users: [],
    updateIsLoading: false,
    selectedUserId: null,
};

export const asyncGetAllUsers = createAsyncThunk('data_userAdmin/getAllUsers', async (_, thunkAPI) => {
    try {
        const response = await api.get('/api/admin/getAllUsers');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to fetch users. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncUpdateUser = createAsyncThunk('data_userAdmin/updateUser', async ({id, request}, thunkAPI) => {
    try {
        const response = await api.put(`/api/admin/updateUser/${id}`, request);
        successMessage(thunkAPI, 'User updated successfully!');
        await thunkAPI.dispatch(asyncGetAllUsers()).unwrap();
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to fetch users. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

const data_userAdminSlice = createSlice({
    name: 'data_userAdmin',
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUserId = action.payload;
        },
        clearSelectedUser: (state) => {
            state.selectedUserId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncGetAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(asyncGetAllUsers.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(asyncUpdateUser.pending, (state) => {
                state.updateIsLoading = true;
            })
            .addCase(asyncUpdateUser.fulfilled, (state) => {
                state.updateIsLoading = false;
            })
            .addCase(asyncUpdateUser.rejected, (state, action) => {
                state.updateIsLoading = false;
            });
    }
});

export const {setSelectedUser, clearSelectedUser} = data_userAdminSlice.actions;
export default data_userAdminSlice.reducer;
