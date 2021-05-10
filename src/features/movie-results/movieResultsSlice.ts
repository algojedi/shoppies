import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Movie } from '../movie/movie'
export interface MovieResultsState {
    status: 'loading' | 'idle'
    error: string | null
    movies: Movie[]
    totalResults: number
    pageNumber: number
}

export const resultsPerPage = 10

const initialState: MovieResultsState = {
    status: 'idle',
    error: null,
    movies: [],
    totalResults: 0,
    pageNumber: 0
}

interface MovieResultsFetchResponse {
    Search: Movie[]
    totalResults: string
    Response: string
    pageNumber: number
}

export interface UserData {
    page: number
    selection: string
}

// This type describes the error object structure:
type FetchMoviesError = {
    message: string
}
function getUniqueList(arr: Movie[]): Movie[] {
    return [...new Map(arr.map((item) => [item.imdbID, item])).values()]
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
    if (userData.selection === '') return emptyResponse
    const formattedSelection = formatSelection(userData.selection)
    let url = `https://www.omdbapi.com/?apikey=ca4f8507&type=movie&s=${formattedSelection}`
    const pageNumUrl = `&page=${userData.page}`
    const response = await fetch(url + pageNumUrl)
    if (response.status !== 200) {
        // Return the error message for server error
        return thunkApi.rejectWithValue({
            message: 'Failed to fetch movies.'
        })
    }
    const data: MovieResultsFetchResponse = await response.json()
    const { Response, totalResults, Search } = data
    if (Response === 'False') return emptyResponse

    // api returns duplicates in some search results
    const uniqueList = getUniqueList(Search) // Search property contains the list of movies
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
            if (payload.pageNumber > 1) {
                state.movies = getUniqueList([
                    ...state.movies,
                    ...payload.Search
                ])
            } else {
                state.movies = [...payload.Search]
            }
            state.status = 'idle'
            state.pageNumber = payload.pageNumber
            state.totalResults = Number.parseInt(payload.totalResults)
        })

        builder.addCase(fetchMovies.rejected, (state, { payload }) => {
            // TODO: display error
            state.status = 'idle'
        })
    }
})

// Create and export the selector:
export const selectMovies = (state: RootState) => state.movies.movies
export const selectStatus = (state: RootState) => state.movies.status
export const selectPageNumber = (state: RootState) => state.movies.pageNumber
export const selectCount = (state: RootState) => state.movies.totalResults
export const selectTotalPages = (state: RootState) =>
    Math.ceil(state.movies.totalResults / resultsPerPage)

export default movieResultsSlice.reducer
