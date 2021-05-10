import React from 'react'
import { Movie } from '../../features/movie/movie'
import { addNomination, selectNoms } from '../../features/nominations/nominationsSlice'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../app/store';
import 'react-toastify/dist/ReactToastify.css';
import './movie-card.scss'
import { toast } from 'react-toastify'

const MovieCard = (movie: Movie) => {
    const dispatch = useDispatch()
    const nominees = useTypedSelector(selectNoms)

    toast.configure()
    const { Title, Year, Poster, imdbID } = movie
    let isNominated = false
    const index = nominees.find(m => m.imdbID === imdbID)
    if (index) {
        isNominated = true
    }

    const nominate = () => {
        if (nominees.length === 5) {
            toast.error('Limit of five nominations', {
                className: "error-toast",
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
            return
        }
        dispatch(addNomination(movie))
    }
    return (
        <section className='movie-card'>
            <img alt='NO PHOTO AVAILABLE' className='movie-card_img' src={Poster} />
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
                    onClick={nominate}>Nominate </button>
            </section>
        </section>
    )
}

export default MovieCard