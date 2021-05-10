import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { Movie } from '../movie/movie'

export interface NominationsState {
    nominations: Movie[]
}

const initialState: NominationsState = {
    nominations: []
}

const addNominationReducer = (
    state: NominationsState,
    action: PayloadAction<Movie>
) => {
    const { payload } = action
    if (state.nominations.length === 5) return
    const index = state.nominations.findIndex(
        (movie: Movie) => movie.imdbID === payload.imdbID
    )
    // do not add movie already nominated
    if (index < 0) state.nominations.push(payload)
}

const removeNominationReducer = (
    state: NominationsState,
    action: PayloadAction<{ id: string }>
) => {
    const { payload } = action
    const index = state.nominations.findIndex(
        (movie: Movie) => movie.imdbID === payload.id
    )
    if (index >= 0) state.nominations.splice(index, 1)
}

const nominationsSlice = createSlice({
    name: 'nominations',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addNomination: addNominationReducer,
        removeNomination: removeNominationReducer
    }
})

// export const { addNomination, removeNomination } = nominationsSlice.actions
export const {
    // addNomination: addNominationAction,
    // removeNomination: removeNominationAction
    addNomination,
    removeNomination
} = nominationsSlice.actions

export const selectNoms = (state: RootState) => state.nominations.nominations
export default nominationsSlice.reducer
