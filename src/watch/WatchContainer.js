import React, { useEffect, useRef, useState } from 'react'
import './WatchContainer.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTv} from '@fortawesome/free-solid-svg-icons';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { isFailing, isLoading, isSuccess } from '../components/redux/slice/AuthSlice';
import { toast } from 'react-toastify';
import CommentWatch from './CommentWatch';
import io from 'socket.io-client';
const WatchContainer = ({cache}) => {

    const {slug} = useParams();
    const [movie,setMovie] = useState();
    const dispatch = useDispatch();


    const movieRef = useRef();

    const [socket,setSocket] = useState();
    const countRef = useRef(1);
    const [episode,setEpisode] = useState([]);

    useEffect(() => {
        const socket = io("https://oldmovie.herokuapp.com");
        setSocket(socket);
        return () => {
        socket.close();
        }
    },[]);

    useEffect(() => {
        if(socket){
        socket.emit("joinRoom",{room:slug});
        }
    },[socket,slug]);


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

    useEffect(() => {
        if(movie){
            if(movie.kind !== 'oldmovie'){
                const eps = movie?.status.split(" ")[1] * 1;
                const newArr = [...Array(eps)].map((i,_i) => _i + 1);
                setEpisode(newArr);
            }
        }
    },[slug,movie]);
    const handleplay = async () => {
        if(countRef.current === 1){
            socket.emit("userWatching",{room:slug});
            countRef.current = 2;
        }
    }
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
                        <video ref={movieRef} onPlay={handleplay} style={{width:"100%",height:"100%"}} src="https://res.cloudinary.com/dqbrxkux1/video/upload/v1650425400/Avatar/tlnqeus3eh0jatmvfohi.mp4" loop controls />
                    </div>
                    <div className='episode'>
                        <FontAwesomeIcon style={{marginRight:"1rem"}} icon={faTv} />
                        Chọn Tập
                    </div>
                    <div style={{marginBottom:"2rem"}} className='episode_container'>
                        {movie?.kind === 'oldmovie' ? <a className='soder active' href="">Full</a>:
                        episode?.map(item => (
                            <a key={item + "abcd"} className={`soder ${item === 1 && 'active'}`} href="">Tập {item}</a>
                        ))}
                    </div>
                    <CommentWatch socket={socket}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WatchContainer