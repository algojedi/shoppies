import { Movie } from '../../features/movie/movie'
import { addNomination, removeNomination } from '../../features/nominations/nominationsSlice'
import { useDispatch } from 'react-redux';

// const MovieCard = ({ Title, Year, Poster, imdbID }: Movie) => {
const NominationCard = (movie: Movie) => {
    const dispatch = useDispatch()
    const { Title, Year, Poster, imdbID } = movie
    return (
        <section>
            {Title}
            {/* <img src={Poster} /> */}
            <button onClick={() => dispatch(removeNomination({ id: movie.imdbID }))}>Remove </button>
        </section>
    )
}

export default NominationCard