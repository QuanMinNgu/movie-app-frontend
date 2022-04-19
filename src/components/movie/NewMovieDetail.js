import React, { useEffect, useState } from 'react'
import CreateMovie from '../auth/CreateMovie';
import Card from '../movieCard/Card';
import './NewMovieDetail.css';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { isFailing, isLoading, isSuccess } from '../redux/slice/AuthSlice';
const NewMovieDetail = ({cache}) => {

  const auth = useSelector(state => state.auth);
  const[movie,setMovie] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let here = true;
    const url = `/api/movie`;
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
              <Card key={item._id + "nwe"} item={item}/>
            ))}
            {auth.user && <CreateMovie />}
        </div>
    </div>
  )
}

export default NewMovieDetail