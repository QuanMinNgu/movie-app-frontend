import React from 'react'
import MovieWatching from '../components/movieNavBar/MovieWatching';
import './MovieList.css';
import MovieListDetail from './MovieListDetail';
const MovieList = ({cache}) => {
  return (
    <div className='grid wide'>
        <div className='row home-container'>
            <div className='col c-10 c-o-1 m-9 l-8'>
              <MovieListDetail cache={cache}/>
            </div>
            <div className='col c-0 m-3 l-4'>
                <MovieWatching cache={cache}/>
            </div>
        </div>
    </div>
  )
}

export default MovieList