import React from 'react'
import './TrailerMovie.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
const TrailerMovie = ({movie}) => {
  return (
    <div className='trailer_container'>
      <FontAwesomeIcon style={{marginRight:"1rem"}} icon={faFilm} />
      TRAILER {movie?.viettitle.toUpperCase()}
    </div>
  )
}

export default TrailerMovie