import React from 'react'
import { Movie } from '../../features/movie/movie'


const MovieCard = ({ Title, Year, Poster }: Movie) => {
    return (
        <div>
            {Title}
            {/* <img src={Poster} /> */}
        </div>
    )
}

export default MovieCard