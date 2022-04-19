import React, { useEffect, useState } from 'react';
import './Categary.css';
import CategaryDetail from './CategaryDetail';
import { Navigation, Pagination,Autoplay } from 'swiper';
import {Link} from 'react-router-dom';
import {isLoading,isFailing,isSuccess} from '../redux/slice/AuthSlice';

import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Categary = ({cache}) => {

  const dispatch = useDispatch();
  const [movie,setMovie] = useState([]);
  useEffect(() => {
    let here = true;
    const url = '/api/movie';
    if(cache.current[url]){
      return setMovie(cache.current[url]);
    }
    dispatch(isLoading());
    axios.get(url)
      .then(res => {
        cache.current[url] = res.data.movie;
        setMovie(res.data.movie);
        dispatch(isSuccess());
      })
      .catch(err => {
        dispatch(isFailing());
      })

    return () => {
      here = false;
    }
  },[]);
  return (
    <Swiper
    modules={[Autoplay,Navigation, Pagination]}
    pagination={{ clickable: true }}
    navigation
    autoplay={{
      delay: 4000,
      disableOnInteraction: false,
    }}
    >
      {movie.map(item => (
        <SwiperSlide>
        <Link to={`/${item.slug}`} className='Link'>
        <CategaryDetail img={item.backgroundimg}/>
        </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Categary