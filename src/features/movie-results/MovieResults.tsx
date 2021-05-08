
// import { useAppSelector, useAppDispatch } from '../../app/hooks';

import styles from './Movie-Results.module.css';
import { Movie, resultsPerPage } from '../movie/movie';
import { useTypedSelector } from '../../app/store';
import { selectMovies, selectPageNumber, selectStatus } from './movieResultsSlice';
import MovieCard from '../../components/movie-card/MovieCard';
import { useDispatch } from 'react-redux';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { selectCount } from './movieResultsSlice';
import { fetchMovies } from './movieResultsSlice';


export function MovieResults() {
    // const dispatch = useDispatch()
    const [hasMore, setHasMore] = useState(false)
    const status = useTypedSelector(selectStatus)
    const observer = useRef<HTMLDivElement | IntersectionObserver | null>(null)
    const totalResults = useTypedSelector(selectCount)
    const totalPages = Math.ceil(totalResults / resultsPerPage)
    const currentPage = useTypedSelector(selectPageNumber)
    if (currentPage === totalPages) setHasMore(false)
    else setHasMore(true)

    const lastElementRef = useCallback((node) => {
        if (status === 'loading') return
        // if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
            }
        })
        if (node) {
            observer.current.observe(node)
        }
        console.log({ node })

    }, [status, hasMore])


    const movies: Movie[] = useTypedSelector(selectMovies)

    return (
        <section className='search-results-section'>

            <h3 className='subheading'>
                Search Results
            </h3>
            <ul className='movie-list'>
                {movies.map((movie: Movie, index) => {
                    if (movies.length === index + 1) {
                        return (<li ref={lastElementRef} key={movie.imdbID} className='movie'>
                            <MovieCard {...movie} />
                        </li>)
                    }
                    return (<li key={movie.imdbID} className='movie'>
                        <MovieCard {...movie} />
                    </li>)
                })}

            </ul>
        </section>
    );
}