import React from 'react'
import './OddMovieNnavBar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFire,faAngleDoubleRight,faFilm} from '@fortawesome/free-solid-svg-icons';
const OddMovieNavBar = () => {
  return (
    <div className='oddmovie'>
        <div className='odd_detail_content'>
            <FontAwesomeIcon icon={faFilm} />
            <p>PHIM LẺ MỚI CẬP NHẬT</p>
        </div>
        <a href={`/danh-sach/oldmovie`} className='odd_watch_all Link'>
            <p>Xem tất cả</p>
            <FontAwesomeIcon style={{fontSize:"1.5rem",cursor:"pointer"}} icon={faAngleDoubleRight} />
        </a>
    </div>
  )
}

export default OddMovieNavBar