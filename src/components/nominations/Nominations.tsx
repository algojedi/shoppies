import {
    selectNoms
} from '../../features/nominations/nominationsSlice';
import { Movie } from '../../features/movie/movie';
import { useTypedSelector } from '../../app/store';
import NominationCard from '../nomination-card/NominationCard';
import './nominations.scss'

export function Nominations() {
    const movies = useTypedSelector(selectNoms)

    return (
        <section className='nominations'>
            <h3 className='nominations_title'>
                Nominations
            </h3>
            {
                movies.length ?
                    <ul className='nominations_movie-list'>
                        {movies.map((movie: Movie) => <li key={movie.imdbID}
                            className='movie'><NominationCard {...movie} /></li>)}
                    </ul> :
                    <h4 className='nominations_no-noms'>
                        First search for a movie, and then nominate!
                    </h4>
            }
        </section>
    );
}
