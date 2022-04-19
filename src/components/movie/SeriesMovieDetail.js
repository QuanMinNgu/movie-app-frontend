import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Card from '../movieCard/Card'
import { isFailing, isLoading, isSuccess } from '../redux/slice/AuthSlice';

const SeriesMovieDetail = ({cache}) => {

  const [movie,setMovie] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let here = true;
    const url = `/api/movie?kind=seriesmovie`;
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
    <div className='new_movie-detail'>
        <div className='row'>
            {movie.map(item => (
              <Card key={item.slug + "series"} item={item}/>
            ))}
        </div>
    </div>
  )
}

export default SeriesMovieDetail