import React from 'react'
import { Movie } from '../../features/movie/movie'
import { addNomination, selectNoms } from '../../features/nominations/nominationsSlice'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../app/store';

const MovieCard = (movie: Movie) => {
    const dispatch = useDispatch()
    const nominees = useTypedSelector(selectNoms)
    const { Title, Year, Poster, imdbID } = movie
    let isNominated = false
    const index = nominees.find(m => m.imdbID === imdbID)
    if (index) {
        isNominated = true
    }

    return (
        <section className='movie-card'>
            <section className="movie-card_img-container">
                <img alt='no photo available' className='movie-card_img-container_img' src={Poster} />
            </section>
            <section className="movie-card_details">
                <h3 className='movie-card_details_title'>
                    {Title}
                </h3>
                <h4 className='movie-card_details_year'>
                    {Year}
                </h4>

            </section>
            <button disabled={isNominated} onClick={() => dispatch(addNomination(movie))}>Nominate </button>
        </section>
    )
}

export default MovieCard