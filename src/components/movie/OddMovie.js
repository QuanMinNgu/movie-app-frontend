import React, { useEffect, useState } from 'react'
import Card from '../movieCard/Card';
import './OddMovie.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { isFailing, isLoading, isSuccess } from '../redux/slice/AuthSlice';
const OddMovie = ({cache}) => {

  const [movie,setMovie] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let here = true;
    const url = `/api/movie?kind=oldmovie`;
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
  },[]);
  return (
    <div className='new_movie-detail'>
        <div className='row'>
            {movie.map(item => (
              <Card key={item.slug + "Odd"} item={item}/>
            ))}
        </div>
    </div>
  )
}

export default OddMovie