import React from 'react'
import './MovieInforAnnouce.css';
const MovieInforAnnouce = ({movie}) => {
  return (
    <div className='movie_announce-infor'>
        <div className='infor_movie'>
            <span>{movie?.description}</span>
        </div>
        <div className='image_movie-infor'>
            <img src={movie?.backgroundimg} />
        </div>
    </div>
  )
}

export default MovieInforAnnouce