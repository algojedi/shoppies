import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMovies } from '../../features/movie-results/movieResultsSlice'

function SearchBar() {
    const dispatch = useDispatch()
    const [input, setInput] = useState('')

    const validate = () => {
        // if (input == '') {
        if (input.length < 2) {
            return false
        }
        return true
    }

    // const handleFetch = (e: React.FormEvent<HTMLFormElement>) => {
    const handleFetch = (e: React.ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault()
        setInput(e.target.value)

        if (validate()) {
            dispatch(fetchMovies({ selection: input, page: 1 }))
        }
    }
    return (
        <section className="form-input-container">
            {/* <input className='text-field' type='text' value={input} onChange={(e) => { setInput(e.target.value) }} /> */}
            <input className='text-field' type='text' value={input}
                onChange={handleFetch} />
            <button className='form-btn' type='submit'>Submit</button>
        </section>
    )
}

export default SearchBar
