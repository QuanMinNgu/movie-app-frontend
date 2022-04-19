import React from 'react';
import Categary from '../categaryMovie/Categary';
import './MovieContainer.css';
import NewMovie from './NewMovie';
import NewMovieDetail from './NewMovieDetail';
import OddMovie from './OddMovie';
import OddMovieNavBar from './OddMovieNavBar';
import SeriesMovie from './SeriesMovie';
import SeriesMovieDetail from './SeriesMovieDetail';
const MovieContaner = ({cache}) => {
  return (
    <div className='movie_part'>
        <Categary cache={cache}/>
        <NewMovie />
        <NewMovieDetail cache={cache}/>
        <SeriesMovie />
        <SeriesMovieDetail cache={cache}/>
        <OddMovieNavBar />
        <OddMovie cache={cache}/>
    </div>
  )
}

export default MovieContaner