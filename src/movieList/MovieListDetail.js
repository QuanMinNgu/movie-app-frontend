import React, { useEffect, useState } from 'react'
import './MovieListDetail.css';
import MovieListNavBar from './MovieListNavBar';
import Card from '../components/movieCard/Card';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { isFailing, isLoading, isSuccess } from '../components/redux/slice/AuthSlice';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';
import MoviePagination from './MoviePagination';
import FormFilter from './FormFilter';
const MovieListDetail = ({cache}) => {

  const [movie,setMovie] = useState([]);
  const {search} = useLocation();
  const [total,setTotal] = useState(0);
  const dispatch = useDispatch();
  const {list} = useParams();
  useEffect(() => {
    let here = true;
    let url;
    if(list === 'new-movie'){
      url = `/api/movie${search ? search + "&" : "?"}limit=20`;
    }
    else{
      url = `/api/movie${search ? search + "&" : "?"}limit=20&kind=${list}`
    }
    console.log(url)
    if(cache.current[url]){
      setMovie(cache.current[url]);
      setTotal(cache.current[url + "page"]);
      return;
    }
    dispatch(isLoading());
    axios.get(url)
      .then(res => {
        cache.current[url] = res.data.movie;
        cache.current[url + "page"] = res.data.count;
        dispatch(isSuccess());
        setMovie(res.data.movie);
        setTotal(res.data.count);
      })
      .catch(err => {
        dispatch(isFailing());
        toast.error(err.response.data.msg);
      })
    return () => {
      here = false;
    }
  },[list,search]);
  return (
    <div className='movie_list-container'>
        <MovieListNavBar />
        <FormFilter />
        <div className='card_container'>
          {movie.map(item => (
            <Card key={item?.slug + "List"} item={item}/>
          ))}
        </div>
        {total > 20 && <MoviePagination count={total}/>}
    </div>
  )
}

export default MovieListDetail