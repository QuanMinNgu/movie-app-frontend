import React, { useEffect, useState } from 'react'
import './WatchContainer.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTv} from '@fortawesome/free-solid-svg-icons';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { isFailing, isLoading, isSuccess } from '../components/redux/slice/AuthSlice';
import { toast } from 'react-toastify';
const WatchContainer = ({cache}) => {

    const {slug} = useParams();
    const [movie,setMovie] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        let here = true;
        const url = `/api/movie/${slug}`;
        if(cache.current[url]){
            return setMovie(cache.current[url]);
        }
        dispatch(isLoading());
        axios.get(url)
            .then(res => {
                if(!here){
                    return;
                }
                setMovie(res.data.movie);
                dispatch(isSuccess());
            })
            .catch(err => {
                toast.error(err.response.data.msg);
                dispatch(isFailing());
            })
        return () => {
            here = false;
        }
    },[slug]);
  return (
    <div className='grid wide'>
        <div className='row'>
            <div className='col c-10 m-12 l-12 c-o-1'>
                <div className='watch_container'>
                    <ul className='watch_navbar'>
                        <li>
                            {movie?.viettitle}
                        </li>
                    </ul>
                    <div className='watch_screen'>
                        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${movie?.trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className='episode'>
                        <FontAwesomeIcon style={{marginRight:"1rem"}} icon={faTv} />
                        Chọn Tập
                    </div>
                    <div className='episode_container'>
                        {movie?.kind === 'oldmovie' ? <a className='soder active' href="">Full</a>:
                        <a className='soder active' href="">Tập 1</a>}
                    </div>
                    <div className='comment_form'>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WatchContainer