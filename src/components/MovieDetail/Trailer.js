import React from 'react'
import './Trailer.css';
const Trailer = ({movie}) => {
  return (
    <div id='trailer' className='trailer_youtube'>
        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${movie?.trailer}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}

export default Trailer