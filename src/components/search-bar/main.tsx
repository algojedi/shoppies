import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDebounce } from '../../app/hooks'
import { useTypedSelector } from '../../app/store'
import { fetchMovies, selectMovies, selectPageNumber, selectStatus, selectTotalPages } from '../../features/movie-results/movieResultsSlice'
import { Movie } from '../../features/movie/movie'
import { Nominations } from '../../features/nominations/Nominations'
import MovieCard from '../movie-card/MovieCard'
import './search-bar.scss'

function Main() {
    const dispatch = useDispatch()
    const [input, setInput] = useState('')
    const debouncedSearchTerm: string = useDebounce<string>(input, 500);
    const status = useTypedSelector(selectStatus)
    const movies: Movie[] = useTypedSelector(selectMovies)
    // const [hasMore, setHasMore] = useState(false)
    const observer = useRef<HTMLDivElement | IntersectionObserver | null>(null)
    const totalPages = useTypedSelector(selectTotalPages)
    const currentPage = useTypedSelector(selectPageNumber)
    const lastElementRef = useCallback((node) => {
        if (status === 'loading') return
        console.table({ totalPages, currentPage })
        // if (observer.current) observer.current.disconnect()
        if (observer.current) {
            (observer.current as IntersectionObserver).disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            const check = currentPage != totalPages
            if (entries[0].isIntersecting && check) {
                console.log('should fetch more movies')
                dispatch(fetchMovies({ selection: input, page: currentPage + 1 }))
            }
            if (entries[0].isIntersecting) {
                console.log('intersection!')
            }
            else console.log('no intersection')
        })
        if (node) {
            observer.current.observe(node)
        }
    }, [currentPage, status])



    // Effect for API call
    useEffect(
        () => {
            if (debouncedSearchTerm) {
                dispatch(fetchMovies({ selection: input, page: 1 }))
            } else {
                dispatch(fetchMovies({ selection: '', page: 1 })) // reset list
                // setResults([]);
            }
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    );

    return (
        <>
            <section className="form-input-container">
                <h1 className="title">The Shoppies</h1>
                <input className='text-field' type='text' value={input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
                {/* <input className='text-field' type='text' value={input} onChange={handleFetch} /> */}
                <button className='form-btn' type='submit'>Submit</button>
                <section className='status-indicator'>{status}</section>
            </section>
            <Nominations />
            <section className='search-results-section'>

                <h3 className='subheading'>
                    Search Results
            </h3>
                <ul className='movie-list'>
                    {movies.map((movie: Movie, index) => {
                        if (movies.length === index + 1) {
                            console.log('attached ref')
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
        </>
    )
}

export default Main
