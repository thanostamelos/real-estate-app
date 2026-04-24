import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from "../apiClient";
import {errorMessage, successMessage} from "../responseMessage";

const FAKE_AUTH_DATA = {
    token: 'dev-no-auth',
    email: 'dev@local',
    firstName: 'Dev',
    lastName: 'User',
    roles: ['ADMIN', 'TICKET_ADMIN', 'USER'],
    isAuthenticated: true
};

const initialState = {
    authData: FAKE_AUTH_DATA,
    authChecked: true,
    isLoading: false,
    createIsLoading: false,
    createResponse: null,
};

export const asyncLoadMe = createAsyncThunk('data_auth/loadMe', async (_, thunkAPI) => {
    return FAKE_AUTH_DATA;
});

export const asyncLogout = createAsyncThunk('data_auth/logout', async (_, thunkAPI) => {
    return true;
});

export const asyncStandardLogin = createAsyncThunk('data_auth/standardLogin', async (data, thunkAPI) => {
    successMessage(thunkAPI, 'Logged in successfully!');
    return FAKE_AUTH_DATA;
});

export const asyncLoginWithGoogle = createAsyncThunk('data_auth/loginWithGoogle', async (idToken, thunkAPI) => {
    successMessage(thunkAPI, 'Logged in successfully!');
    return FAKE_AUTH_DATA;
});

export const asyncCreateAccount = createAsyncThunk('data_auth/createAccount', async (data, thunkAPI) => {
    try {
        const response = await api.post('/api/auth/signup', data);
        successMessage(thunkAPI, 'Created account successfully!');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to create account. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

const data_authSlice = createSlice({
    name: 'data_auth',
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.authData = FAKE_AUTH_DATA;
        },
        logout: (state) => {
            // no-op: πάντα authenticated
            state.authData = FAKE_AUTH_DATA;
            state.authChecked = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncLoadMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncLoadMe.fulfilled, (state) => {
                state.isLoading = false;
                state.authChecked = true;
                state.authData = FAKE_AUTH_DATA;
            })
            .addCase(asyncLoadMe.rejected, (state) => {
                state.isLoading = false;
                state.authChecked = true;
                state.authData = FAKE_AUTH_DATA;
            })

            .addCase(asyncStandardLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncStandardLogin.fulfilled, (state) => {
                state.isLoading = false;
                state.authData = FAKE_AUTH_DATA;
            })
            .addCase(asyncStandardLogin.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(asyncLoginWithGoogle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncLoginWithGoogle.fulfilled, (state) => {
                state.isLoading = false;
                state.authData = FAKE_AUTH_DATA;
            })
            .addCase(asyncLoginWithGoogle.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(asyncLogout.fulfilled, (state) => {
                state.authData = FAKE_AUTH_DATA;
            })
            .addCase(asyncLogout.rejected, (state) => {
                state.authData = FAKE_AUTH_DATA;
            })

            .addCase(asyncCreateAccount.pending, (state) => {
                state.createIsLoading = true;
            })
            .addCase(asyncCreateAccount.fulfilled, (state, action) => {
                state.createIsLoading = false;
                state.createResponse = action.payload;
            })
            .addCase(asyncCreateAccount.rejected, (state) => {
                state.createIsLoading = false;
            });
    }
});

export const {loginSuccess, logout} = data_authSlice.actions;
export default data_authSlice.reducer;