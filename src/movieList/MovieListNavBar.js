import React from 'react'
import './MovieListNavbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFolder} from '@fortawesome/free-solid-svg-icons';
const MovieListNavBar = () => {
  return (
    <div className='movie_list-navbar'>
        <FontAwesomeIcon style={{marginRight:"0.5rem"}} icon={faFolder} />
        DANH SÁCH PHIM
    </div>
  )
}

export default MovieListNavBar