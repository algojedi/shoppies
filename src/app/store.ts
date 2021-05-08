import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import nominationsReducer from '../features/nominations/nominationsSlice'
import moviesReducer from '../features/movie-results/movieResultsSlice'

export const store = configureStore({
    reducer: {
        nominations: nominationsReducer,
        movies: moviesReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
