import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { MovieResultsFetchResponse, Movie } from '../movie/movie'
export interface MovieResultsState {
    status: 'loading' | 'idle'
    error: string | null
    movies: Movie[]
    totalResults: number
    pageNumber: number
}

const initialState: MovieResultsState = {
    status: 'idle',
    error: null,
    movies: [],
    totalResults: 0,
    pageNumber: 0
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

const emptyResponse: MovieResultsFetchResponse = {
    Search: [],
    totalResults: '0',
    Response: 'False',
    pageNumber: 0
}

const formatSelection = (userInput: string) => {
    const result = userInput.trim()
    // replace possible blank spaces in search title
    return result.replaceAll(' ', '+')
}
export const fetchMovies = createAsyncThunk<
    MovieResultsFetchResponse,
    UserData,
    { rejectValue: FetchMoviesError }
>('movies/fetch', async (userData, thunkApi) => {
    // >
    // 'movies/fetch',
    // async (userData: UserData) => {
    if (userData.selection == '') return emptyResponse
    const formattedSelection = formatSelection(userData.selection)
    let url = `http://www.omdbapi.com/?apikey=ca4f8507&type=movie&s=${formattedSelection}`
    const pageNumUrl = `&page=${userData.page}`
    const response = await fetch(url + pageNumUrl)
    // console.log({ url: url + pageNumUrl })
    if (response.status !== 200) {
        // Return the error message for server error
        console.log('error message when fetching')
        return thunkApi.rejectWithValue({
            message: 'Failed to fetch movies.'
        }) // as FetchMoviesError
    }
    const data: MovieResultsFetchResponse = await response.json()
    console.log({ data })
    const { Response, totalResults, Search } = data
    if (Response == 'False') return emptyResponse

    // api returns duplicates in some search results
    const uniqueList = getUniqueList(Search) // Search property contains the list of movies
    // const count = Number.parseInt(totalResults)
    return {
        Search: uniqueList,
        Response,
        totalResults,
        pageNumber: userData.page
    } as MovieResultsFetchResponse
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
            // state.movies = [...payload]
            // state.movies = payload.state.status = 'idle'
            state.movies = [...payload.Search]
            state.status = 'idle'
            state.totalResults = Number.parseInt(payload.totalResults)
        })

        builder.addCase(fetchMovies.rejected, (state, { payload }) => {
            // if (payload) state.error = payload.message
            // TODO: display error somehow
            state.status = 'idle'
        })
    }
})

// Create and export the selector:
export const selectMovies = (state: RootState) => state.movies.movies
export const selectStatus = (state: RootState) => state.movies.status
export const selectPageNumber = (state: RootState) => state.movies.pageNumber
export const selectCount = (state: RootState) => state.movies.totalResults

export default movieResultsSlice.reducer
