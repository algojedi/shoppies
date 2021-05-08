import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDebounce } from '../../app/hooks'
import { useTypedSelector } from '../../app/store'
import { fetchMovies, selectStatus } from '../../features/movie-results/movieResultsSlice'

function SearchBar() {
    const dispatch = useDispatch()
    // const dispatch = useAppDispatch()
    const [input, setInput] = useState('')
    const debouncedSearchTerm: string = useDebounce<string>(input, 500);
    const status = useTypedSelector(selectStatus)

    // const [isSearching, setIsSearching] = useState<boolean>(false);


    // Effect for API call
    useEffect(
        () => {
            if (debouncedSearchTerm) {
                dispatch(fetchMovies({ selection: input, page: 1 }))
            } else {
                dispatch(fetchMovies({ selection: '', page: 1 })) // reset list
                // setResults([]);
            }
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    );

    // const handleFetch = (e: React.FormEvent<HTMLFormElement>) => {
    // const handleFetch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     // e.preventDefault()
    //     setInput(e.target.value)

    //     if (validate()) {
    //         dispatch(fetchMovies({ selection: input, page: 1 }))
    //     }
    // }
    return (
        <section className="form-input-container">
            <input className='text-field' type='text' value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
            {/* <input className='text-field' type='text' value={input} onChange={handleFetch} /> */}
            <button className='form-btn' type='submit'>Submit</button>
            <section className='status-indicator'>{status}</section>
        </section>

    )
}

export default SearchBar
