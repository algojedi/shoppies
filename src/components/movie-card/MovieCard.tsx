import React from 'react'
import { Movie } from '../../features/movie/movie'
import { addNomination } from '../../features/nominations/nominationsSlice'
import { useDispatch } from 'react-redux';

// const MovieCard = ({ Title, Year, Poster, imdbID }: Movie) => {
const MovieCard = (movie: Movie) => {
    const dispatch = useDispatch()
    const { Title, Year, Poster, imdbID } = movie
    return (
        <section>
            {Title}
            {/* <img src={Poster} /> */}
            <button onClick={() => dispatch(addNomination(movie))}>Nominate </button>
        </section>
    )
}

export default MovieCard