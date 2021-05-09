
import React, { useState } from 'react';

// import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    addNomination,
    removeNomination,
    selectNoms
} from './nominationsSlice';
import styles from './Nominations.module.css';
import { Movie } from '../movie/movie';
import { useTypedSelector } from '../../app/store';
import { useDispatch } from 'react-redux';
import NominationCard from '../../components/nomination-card/NominationCard';
import './nominations.scss'

export function Nominations() {
    // const dispatch = useAppDispatch();
    const dispatch = useDispatch()
    const movies = useTypedSelector(selectNoms)

    return (
        <section className='nominations'>

            <h3 className='nominations_title'>
                Nominations
            </h3>
            <ul className='nominations_movie-list list'>
                {movies.map((movie: Movie) => <li key={movie.imdbID}
                    className='movie'><NominationCard {...movie} /></li>)}
            </ul>

        </section>
    );
}
