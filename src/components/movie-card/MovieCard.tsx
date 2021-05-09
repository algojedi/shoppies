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
            <img alt='no photo available' className='movie-card_img' src={Poster} />
            <section className="movie-card_details">
                <section className="movie-card_details_info">
                    <h3 className='movie-card_details_info_title'>
                        {Title}
                    </h3>
                    <h4 className='movie-card_details_info_year'>
                        {Year}
                    </h4>
                </section>
                <button disabled={isNominated}
                    className='movie-card_details_nominate-btn'
                    onClick={() => dispatch(addNomination(movie))}>Nominate </button>
            </section>
        </section>
    )
}

export default MovieCard