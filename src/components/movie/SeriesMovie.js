import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFire,faAngleDoubleRight,faFilm} from '@fortawesome/free-solid-svg-icons';
import './SeriesMovie.css';
const SeriesMovie = () => {
  return (
    <div className='seriesmovie'>
        <div className='series_detail_content'>
            <FontAwesomeIcon icon={faFilm} />
            <p>PHIM BỘ MỚI CẬP NHẬT</p>
        </div>
        <a href={`/danh-sach/seriesmovie`} className='series_watch_all Link'>
            <p>Xem tất cả</p>
            <FontAwesomeIcon style={{fontSize:"1.5rem",cursor:"pointer"}} icon={faAngleDoubleRight} />
        </a>
    </div>
  )
}

export default SeriesMovie