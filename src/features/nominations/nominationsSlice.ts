import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { Movie } from '../movie/movie'

export interface NominationsState {
    nominations: Movie[]
}

const initialState: NominationsState = {
    nominations: []
    // {
    //     Title: 'A Million Ways to Die in the West',
    //     Year: '2014',
    //     imdbID: 'tt2557490',
    //     Type: 'movie',
    //     Poster:
    //         'https://m.media-amazon.com/images/M/MV5BMTQ0NDcyNjg0MV5BMl5BanBnXkFtZTgwMzk4NTA4MTE@._V1_SX300.jpg'
    // }
    // ]
}

const addNominationReducer = (
    state: NominationsState,
    action: PayloadAction<Movie>
) => {
    const { payload } = action
    console.log('adding nomination')
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
