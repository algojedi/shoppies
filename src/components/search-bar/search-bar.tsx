import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMovies } from '../../features/movie-results/movieResultsSlice'

function SearchBar() {
    const dispatch = useDispatch()
    const [input, setInput] = useState('')

    const validate = () => {
        if (input == '') {
            return false
        }
        return true
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('click received')
        if (validate()) {
            console.log('dispatching fetch movies')
            dispatch(fetchMovies(input))
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <section className="form-input-container">
                <input className='text-field' type='text' value={input} onChange={(e) => { setInput(e.target.value) }} />
                <button className='form-btn' type='submit'>Submit</button>
            </section>
        </form>
    )
}

export default SearchBar
