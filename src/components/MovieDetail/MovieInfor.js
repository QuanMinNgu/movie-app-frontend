import React from 'react'
import './MovieInfor.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilm,faCaretRight,faCheck,faUser,faClock,faCalendarDay,
    faThumbsUp,faBars,faEarthAsia,faEye,faStar} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const MovieInfor = ({movie}) => {
    
    
  return (
    <div className='movie_infor'>
        <div className='row h_100'>
            <div className='col c-5 m-5 l-5 h_100'>
                <div className='movie_infor-img'>
                    <img src={movie?.backgroundimg} />
                    <div className='button_watch'>
                        <button className='trailer'>
                            <FontAwesomeIcon style={{marginRight:"0.2rem"}} icon={faFilm} />
                            Trailer
                        </button>
                        <button className='watch'>
                            <Link to={`/watch/${movie?.slug}`} style={{color:"white"}} className="Link">
                                <FontAwesomeIcon style={{marginRight:"0.3rem",fontSize:"1.6rem"}} icon={faCaretRight} />
                                Xem Phim
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className='col c-7 m-7 l-7 h_100'>
                <div className='movie_infor-detail'>
                    <div className='name_movie-infor'>
                        <span>{movie?.viettitle.toUpperCase()}</span>
                    </div>
                    <div className='status_movie-infor'>
                        <span>HD | {movie?.englishtitle} ({movie?.NSX}) | {movie?.status} VietSub</span>
                    </div>
                    <div className='status_movie-name-infor'>
                        <FontAwesomeIcon style={{marginRight:"0.4rem",fontSize:"1rem"}} icon={faCheck} />
                        <span>
                            Status: <p> {movie?.status} Vietsub</p>
                        </span>
                    </div>
                    <div className='director_movie-infor'>
                        <FontAwesomeIcon style={{marginRight:"0.4rem",fontSize:"1rem"}} icon={faUser} />
                        <span>
                            Đạo diễn: <p>Quang Ngu</p>
                        </span>
                    </div>
                    <div className='actor_movie-infor'>
                        <FontAwesomeIcon style={{marginRight:"0.4rem",fontSize:"1rem"}} icon={faUser} />
                        <span>
                            Diễn Viên: <p>Quang Ngu</p>
                        </span>
                    </div>
                    <div className='time_movie-infor'>
                        <FontAwesomeIcon style={{marginRight:"0.4rem",fontSize:"1rem"}} icon={faCalendarDay} />
                        <span>
                            Thời Lượng: <p>{movie?.times}</p>
                        </span>
                    </div>
                    <div className='time_movie-infor'>
                        <FontAwesomeIcon style={{marginRight:"0.4rem",fontSize:"1rem"}} icon={faClock} />
                        <span>
                            Năm Sản Xuất: <p>{movie?.NSX}</p>
                        </span>
                    </div>
                    <div className='time_movie-infor'>
                        <FontAwesomeIcon style={{marginRight:"0.8rem",fontSize:"1rem"}} icon={faBars} />
                        <span>
                            Thể Loại: <p>{movie?.categary}</p>
                        </span>
                    </div>
                    <div className='time_movie-infor'>
                        <FontAwesomeIcon style={{marginRight:"0.8rem",fontSize:"1rem"}} icon={faEarthAsia} />
                        <span>
                            Quốc Gia: <p>{movie?.country}</p>
                        </span>
                    </div>
                    <div className='eyes_movie-infor'>
                        <FontAwesomeIcon style={{marginRight:"0.8rem",fontSize:"1rem"}} icon={faEye} />
                        <span>
                            Lượt Xem: <p>68,314</p>
                        </span>
                    </div>
                    <div className='like_movie-infor'>
                        <button className='like'>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            Thích
                        </button>
                        <button className='share'>Chia Sẻ</button>
                    </div>
                    <div className='review_movie-infor'>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieInfor