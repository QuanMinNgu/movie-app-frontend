import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFire,faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import './NewMovie.css';
const NewMovie = () => {
  return (
    <div className='newmovie'>
        <div className='detail_content'>
            <FontAwesomeIcon icon={faFire} />
            <p>PHIM MỚI ĐỀ CỬ</p>
        </div>
        <a href={`/danh-sach/new-movie`} className='watch_all Link'>
            <p>Xem tất cả</p>
            <FontAwesomeIcon style={{fontSize:"1.5rem",cursor:"pointer"}} icon={faAngleDoubleRight} />
        </a>
    </div>
  )
}

export default NewMovie