
import React from 'react'
import MovieContaner from '../movie/MovieContaner';
import MovieWatching from '../movieNavBar/MovieWatching';
import './Home.css';
const Home = ({cache}) => {

  
  return (
    <div className='grid wide'>
        <div className='row home-container'>
            <div className='col c-10 c-o-1 m-9 l-8'>
              <MovieContaner cache={cache}/>
            </div>
            <div className='col c-0 m-3 l-4'>
                <MovieWatching cache={cache}/>
            </div>
        </div>
    </div>
  )
}

export default Home