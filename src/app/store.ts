import {
    configureStore,
    ThunkAction,
    Action,
    getDefaultMiddleware
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { logger } from 'redux-logger'
import nominationsReducer from '../features/nominations/nominationsSlice'
import moviesReducer from '../features/movie-results/movieResultsSlice'

const inProduction = process.env.NODE_ENV === 'production'
const middleware = [...getDefaultMiddleware(), logger]
export const store = configureStore({
    reducer: {
        nominations: nominationsReducer,
        movies: moviesReducer
    },
    middleware,
    devTools: false //!inProduction
})

// export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
