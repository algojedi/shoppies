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
export interface UserData {
    page: number
    selection: string
}

const formatSelection = (userInput: string) => {
    const result = userInput.trim()
    // replace possible blank spaces in search title
    return result.replaceAll(' ', '+')
}
export const fetchMovies = createAsyncThunk<
    Movie[],
    UserData,
    { rejectValue: FetchMoviesError }
>('movies/fetch', async (userData: UserData, thunkApi) => {
    if (userData.selection == '') return []
    const formattedSelection = formatSelection(userData.selection)
    let url = `http://www.omdbapi.com/?apikey=ca4f8507&type=movie&s=${formattedSelection}`
    const pageNum = `&page=${userData.page}`
    const response = await fetch(url + pageNum)
    console.log({ url: url + pageNum })
    if (response.status !== 200) {
        // Return the error message for server error
        console.log('error message when fetching')
        return thunkApi.rejectWithValue({
            message: 'Failed to fetch movies.'
        })
    }
    const data: MovieResultsResponse = await response.json()
    console.log({ data })
    if (data.Response == 'False') return []
    // api returns duplicates in some search results
    const uniqueList = getUniqueList(data.Search) // Search property contains the list of movies
    console.log({ uniqueList })
    return uniqueList
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
            // state.movies.push(...payload) // TODO: may cause error b/c of incorrect type
            state.movies = [...payload]
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
export const selectStatus = (state: RootState) => state.movies.status

export default movieResultsSlice.reducer
