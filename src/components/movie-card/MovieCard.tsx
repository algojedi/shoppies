import React from 'react'
import { Movie } from '../../features/movie/movie'
import { addNomination, selectNoms } from '../../features/nominations/nominationsSlice'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../app/store';

// const MovieCard = ({ Title, Year, Poster, imdbID }: Movie) => {
const MovieCard = (movie: Movie) => {
    const dispatch = useDispatch()
    const nominees = useTypedSelector(selectNoms)
    const { Title, Year, Poster, imdbID } = movie
    let isNominated = false
    const index = nominees.find(m => m.imdbID === movie.imdbID)
    if (index) {
        isNominated = true
    }

    return (
        <section>
            {Title}
            {/* <img src={Poster} /> */}
            <button disabled={isNominated} onClick={() => dispatch(addNomination(movie))}>Nominate </button>
        </section>
    )
}

export default MovieCard