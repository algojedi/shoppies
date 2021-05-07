import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { Movie, MovieResultsResponse } from '../movie/movie'
import nominationsSlice from '../nominations/nominationsSlice'

export interface MovieResultsState {
    status: 'loading' | 'idle'
    error: string | null
    movies: Movie[]
}

const initialState: MovieResultsState = {
    status: 'idle',
    error: null,
    movies: []
}

// This type describes the error object structure:
type FetchMoviesError = {
    message: string
}
function getUniqueList(arr: Movie[]): Movie[] {
    return [...new Map(arr.map((item) => [item.imdbID, item])).values()]
}

export const fetchMovies = createAsyncThunk<
    Movie[],
    string,
    { rejectValue: FetchMoviesError }
>('movies/fetch', async (selection: string, thunkApi) => {
    const formattedSelection = selection.replaceAll(' ', '+')
    const response = await fetch(
        `http://www.omdbapi.com/?apikey=ca4f8507&type=movie&s=${formattedSelection}`
    )
    // Check if status is not okay:
    if (response.status !== 200) {
        // TODO: I think i should be checking for response.response
        // Return the error message:
        console.log('error message when fetching')
        return thunkApi.rejectWithValue({
            message: 'Failed to fetch movies.'
        })
    }
    const data: MovieResultsResponse = await response.json()
    const movies = data.Search.filter((movie: Movie) => movie.Type == 'movie')
    const uniqeList = getUniqueList(data.Search) // Search property contains the list of movies
    console.log({ uniqeList })
    return uniqeList
})

export const movieResultsSlice = createSlice({
    name: 'movieResults',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state: MovieResultsState) => {
            state.status = 'loading'
            state.error = null
        })

        builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
            // state.todos.push(...payload)
            state.movies.push(...payload) // TODO: may cause error b/c of incorrect type
            state.status = 'idle'
        })

        builder.addCase(fetchMovies.rejected, (state, { payload }) => {
            if (payload) state.error = payload.message
            // TODO: display error somehow
            state.status = 'idle'
        })
    }
})

// Create and export the selector:
export const selectMovies = (state: RootState) => state.movies.movies

export default movieResultsSlice.reducer
