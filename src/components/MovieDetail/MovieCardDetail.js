import React,{useEffect,useRef,useState} from 'react'
import CommentNavBar from './CommentNavBar';
import MovieAnnouce from './MovieAnnouce';
import './MovieCardDetail.css';
import MovieInfor from './MovieInfor';
import MovieInforAnnouce from './MovieInforAnnouce';
import Trailer from './Trailer';
import TrailerMovie from './TrailerMovie';
import Comment from './Comment';
import axios from 'axios';
import { useParams} from 'react-router-dom';
const MovieCardDetail = ({cache,socket}) => {

  const [movie,setMovie] = useState();
  const {slug} = useParams();

  useEffect(() => {
    let here = true;
    const url = `/api/movie/${slug}`;
    if(cache.current[url]){
        return setMovie(cache.current[url]);
    }
    axios.get(url)
        .then(res => {
            if(!here){
                return;
            }
            cache.current[url] = res.data.movie;
            setMovie(res.data.movie);
        })
    return () => {
        here = false;
    }
  },[slug]);
  return (
    <div className='movie_card-container'>
        <MovieInfor movie={movie}/>
        <MovieAnnouce />
        <MovieInforAnnouce movie={movie}/>
        <TrailerMovie movie={movie}/>
        <Trailer movie={movie}/>
        <CommentNavBar />
        <Comment socket={socket}/>
    </div>
  )
}

export default MovieCardDetail