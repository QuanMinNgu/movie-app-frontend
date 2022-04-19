import React from 'react'
import './MovieAnnounce.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClone} from '@fortawesome/free-solid-svg-icons';
const MovieAnnouce = () => {
  return (
    <div className='announce_navbar'>
        <FontAwesomeIcon style={{marginRight:"1rem"}} icon={faClone} />
        NỘI DUNG PHIM
    </div>
  )
}

export default MovieAnnouce