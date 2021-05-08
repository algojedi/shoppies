
import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    addNomination,
    removeNomination,
    selectNoms
} from './nominationsSlice';
import styles from './Nominations.module.css';
import { Movie } from '../movie/movie';
import { useTypedSelector } from '../../app/store';

export function Nominations() {
    const dispatch = useAppDispatch();
    const movies = useTypedSelector(selectNoms)

    return (
        <section className='nominations'>

            <h3 className='subheading'>
                Nominations
            </h3>
            <ul className='movie-list'>
                {movies.map((movie: Movie) => <li key={movie.imdbID} className='movie'>{movie.Title}</li>)}
            </ul>

        </section>
    );
}
