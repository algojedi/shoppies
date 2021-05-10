import { Movie } from '../../features/movie/movie'
import { removeNomination } from '../../features/nominations/nominationsSlice'
import { useDispatch } from 'react-redux';
import { MdClose } from "react-icons/md";
import './nominationCard.scss'

const NominationCard = (movie: Movie) => {
    const dispatch = useDispatch()
    const { Title, Year, imdbID } = movie
    return (
        <section className='nomination-card card'>
            <section className="nomination-card_info">
                <span className='nomination-card_info_title'>
                    {Title}
                </span>
                <span className='nomination-card_info_year'>
                    {Year}
                </span>
            </section>
            {/* <img src={Poster} /> */}
            <div className='nomination-card_remove-btn' onClick={() => dispatch(removeNomination({ id: imdbID }))}>
                <MdClose className='nomination-card_remove-btn_icon' />
            </div>
        </section>
    )
}

export default NominationCard