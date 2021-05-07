
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import styles from './Movie-Results.module.css';
import { Movie } from '../movie/movie';
import { useTypedSelector } from '../../app/store';
import { selectMovies } from './movieResultsSlice';
import MovieCard from '../../components/movie-card/MovieCard';

export function MovieResults() {
    const dispatch = useAppDispatch();
    const movies: Movie[] = useTypedSelector(selectMovies)

    return (
        <section className='search-results-section'>

            <h3 className='subheading'>
                Search Results
            </h3>
            <ul className='movie-list'>
                {movies.map((movie: Movie) => <li key={movie.imdbID}
                    className='movie'><MovieCard {...movie} /></li>)}
            </ul>

        </section>
    );
}
