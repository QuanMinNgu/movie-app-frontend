import React, { useEffect, useState } from 'react'
import './MovieWatching.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartLine} from '@fortawesome/free-solid-svg-icons';
import Content from './Content';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { isFailing, isLoading, isSuccess } from '../redux/slice/AuthSlice';
const MovieWatching = ({cache}) => {


  const [days,setDays] = useState('day');
  const [movie,setMovie] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let here = true;
    const url = "/api/movie";
    if(cache.current[url]){
      return setMovie(cache.current[url]);
    }
    dispatch(isLoading());
    axios.get(url)
      .then(res => {
        if(!here){
          return;
        }
        cache.current[url] = res.data.movie;
        dispatch(isSuccess());
        setMovie(res.data.movie);
      })
      .catch(err => {
        dispatch(isFailing());
      })

    return () => {
      here = false;
    }
    
  },[days]); 

  const acitve =(e) => {
    if(e === days){
      return 'active';
    }
  }
  return (
    <div className='movie_contain'>
      <div className='movie_navbar'>
        <div className='brand_movie'>
            <FontAwesomeIcon icon={faChartLine} />
            <span>PHIM XEM NHIỀU</span>
        </div>
      </div>
      <div className='tabs'>
        <div onClick={() => setDays('day')} className={`day ${acitve('day')}`}>
          <span>NGÀY</span>
        </div>
        <div onClick={() => setDays('week')} className={`day ${acitve('week')}`}>
          <span>TUẦN</span>
        </div>
        <div onClick={() => setDays('month')} className={`day ${acitve('month')}`}>
          <span>THÁNG</span>
        </div>
      </div>
      <div className='main-content'>
        {movie.map(item => (
          <Content key={item?.viettitle + "C"} item={item}/>
        ))}
      </div>
    </div>
  )
}

export default MovieWatching