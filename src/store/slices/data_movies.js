import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from "../apiClient";
import {errorMessage, successMessage} from "../responseMessage";

const initialState = {
    createIsLoading: false,
    listData: [],
    listDataLoading: false,
    deleteIsLoading: false,
    updateIsLoading: false,
    selectedMovie: null,
    moviePairsLoading: false,
    moviePairs: [],
};

export const asyncGetAllMovies = createAsyncThunk('data_movies/getAllMovies', async (_, thunkAPI) => {
    try {
        const response = await api.get('/api/movie/getData');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to fetch movies. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncCreateMovie = createAsyncThunk('data_movies/createEvent', async (data, thunkAPI) => {
    try {
        const response = await api.post('/api/movie/create', data);
        await thunkAPI.dispatch(asyncGetAllMovies()).unwrap();
        successMessage(thunkAPI, 'Movie created successfully!');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to create movie. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncDeleteMovie = createAsyncThunk('data_movies/deleteMovie', async (id, thunkAPI) => {
    try {
        const response = await api.delete(`/api/movie/delete/${id}`);
        await thunkAPI.dispatch(asyncGetAllMovies()).unwrap();
        successMessage(thunkAPI, 'Movie deleted successfully!');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to delete movie. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncUpdateMovie = createAsyncThunk('data_movies/updateEvent', async ({id, data}, thunkAPI) => {
    try {
        const response = await api.put(`/api/movie/update/${id}`, data);
        await thunkAPI.dispatch(asyncGetAllMovies()).unwrap();
        successMessage(thunkAPI, 'Movie updated successfully!');
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to update movie. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

export const asyncFindMovieKeyLabels = createAsyncThunk('data_movies/findMovieKeyLabels', async (_, thunkAPI) => {
    try {
        const response = await api.get(`/api/movie/findMovieKeyLabels`);
        return response.data;
    } catch (error) {
        errorMessage(thunkAPI, error, 'Failed to fetch movie pairs. Please try again.');
        return thunkAPI.rejectWithValue(error);
    }
});

const data_moviesSlice = createSlice({
    name: 'data_movies',
    initialState,
    reducers: {
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
        clearSelectedMovie: (state) => {
            state.selectedMovie = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllMovies.pending, (state) => {
                state.listDataLoading = true;
            })
            .addCase(asyncGetAllMovies.fulfilled, (state, action) => {
                state.listDataLoading = false;
                state.listData = action.payload.map(movie => ({
                    ...movie,
                    createdOn: new Date(movie?.createdOn),
                    updatedOn: new Date(movie?.updatedOn),
                    releaseDate: new Date(movie?.releaseDate),
                }));
            })
            .addCase(asyncGetAllMovies.rejected, (state) => {
                state.listDataLoading = false;
            })
            .addCase(asyncCreateMovie.pending, (state) => {
                state.createIsLoading = true;
            })
            .addCase(asyncCreateMovie.fulfilled, (state) => {
                state.createIsLoading = false;
            })
            .addCase(asyncCreateMovie.rejected, (state) => {
                state.createIsLoading = false;
            })
            .addCase(asyncDeleteMovie.pending, (state) => {
                state.deleteIsLoading = true;
            })
            .addCase(asyncDeleteMovie.fulfilled, (state) => {
                state.deleteIsLoading = false;
            })
            .addCase(asyncDeleteMovie.rejected, (state) => {
                state.deleteIsLoading = false;
            })
            .addCase(asyncUpdateMovie.pending, (state) => {
                state.updateIsLoading = true;
            })
            .addCase(asyncUpdateMovie.fulfilled, (state) => {
                state.updateIsLoading = false;
            })
            .addCase(asyncUpdateMovie.rejected, (state) => {
                state.updateIsLoading = false;
            })
            .addCase(asyncFindMovieKeyLabels.pending, (state) => {
                state.moviePairsLoading = true;
            })
            .addCase(asyncFindMovieKeyLabels.fulfilled, (state, action) => {
                state.moviePairsLoading = false;
                state.moviePairs = action?.payload;
            })
            .addCase(asyncFindMovieKeyLabels.rejected, (state) => {
                state.moviePairsLoading = false;
            });
    }
});

export const {setSelectedMovie, clearSelectedMovie} = data_moviesSlice.actions;
export default data_moviesSlice.reducer;