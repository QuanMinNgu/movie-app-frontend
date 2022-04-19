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
const MovieListDetail = ({cache}) => {

  const [movie,setMovie] = useState([]);
  const {search} = useLocation();
  const page = new URLSearchParams(search).get('page');
  const [total,setTotal] = useState(0);
  const dispatch = useDispatch();
  const {list} = useParams();

  useEffect(() => {
    let here = true;
    let url;
    if(list === 'new-movie'){
      url = `/api/movie?limit=20&page=${page}`;
    }
    else{
      url = `/api/movie?limit=20&kind=${list}&page=${page}`
    }
    if(cache.current[url]){
      setMovie(cache.current[url]);
      return setTotal(cache.current[url + "page"]);
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
  },[search]);
  return (
    <div className='movie_list-container'>
        <MovieListNavBar />
        <div className='form-filter'>
            <select className='order'>
              <option>-- Sắp Xếp --</option>
              <option>Mới Cập Nhật</option>
              <option>Cũ Nhất</option>
              <option>Năm Sản Xuất</option>
            </select>
            <select className='kind'>
              <option>-- Loại --</option>
              <option>Phim Lẻ</option>
              <option>Phim Bộ</option>
            </select>
            <select className='categary'>
              <option>--Thể Loại--</option>
              <option>Phim Lẻ</option>
              <option>Phim Bộ</option>
            </select>
            <select className='country'>
              <option>--Quốc Gia --</option>
              <option>Hoa Kỳ</option>
              <option>Việt Nam</option>
            </select>
            <select className='year'>
              <option>--Năm --</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </select>
            <button className='form_filter-button'>Lọc Phim</button>
        </div>
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