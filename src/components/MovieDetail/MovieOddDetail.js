import React, { useEffect, useState } from 'react'
import MovieWatching from '../movieNavBar/MovieWatching';
import MovieCardDetail from './MovieCardDetail';
import './MovieOddDetail.css';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
const MovieOddDetail = ({cache}) => {

  const [socket,setSocket] = useState();

  useEffect(() => {
    const socket = io("https://oldmovie.herokuapp.com");
    setSocket(socket);
    return () => {
      socket.close();
    }
  },[]);
  const {slug} = useParams();

  useEffect(() => {
    if(socket){
      socket.emit("joinRoom",{room:slug});
    }
  },[socket,slug]);

  return (
    <div className='grid wide'>
      <div className='row movie-container'>
            <div className='col c-10 c-o-1 m-9 l-8'>
              <MovieCardDetail socket={socket} cache={cache}/>
            </div>
            <div className='col c-0 m-3 l-4'>
                <MovieWatching cache={cache}/>
            </div>
        </div>
    </div>
  )
}

export default MovieOddDetail