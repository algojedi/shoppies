import { Movie } from '../../features/movie/movie'
import { addNomination, removeNomination } from '../../features/nominations/nominationsSlice'
import { useDispatch } from 'react-redux';
// import { FaRegWindowClose } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import './nominationCard.scss'

// const MovieCard = ({ Title, Year, Poster, imdbID }: Movie) => {
const NominationCard = (movie: Movie) => {
    const dispatch = useDispatch()
    const { Title, Year, Poster, imdbID } = movie
    return (
        <section className='nomination-card'>
            <section className="nomination-card_info">
                <span className='nomination-card_info_title'>
                    {Title}
                </span>
                <span className='nomination-card_info_year'>
                    {Year}
                </span>
            </section>
            {/* <img src={Poster} /> */}
            <div className='nomination-card_remove-btn' onClick={() => dispatch(removeNomination({ id: movie.imdbID }))}>
                <MdClose className='nomination-card_remove-btn_icon' />
            </div>
        </section>
    )
}

export default NominationCard