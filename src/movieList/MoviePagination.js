import React, { useState } from 'react'
import usePagination from '../usequery/usePagination';
import './MoviePagination.css';
import PaginationPage from './PaginationPage';
const MoviePagination = ({count}) => {

    const {jum,activepage,num,firstArr,lastArr} = usePagination({total:count,limit:20});

    
  return (
    <div className='pagination_container'>
        {firstArr.length > 0 ? 
        firstArr.map(item => (
          <PaginationPage jum={jum} activepage={activepage} item={item - 1} key={item} />
        ))
        : 
        [...Array(num || 1)].map((item,index) => (
            <PaginationPage jum={jum} activepage={activepage} item={index} key={index} />
        ))}
        {lastArr.length > 0 && 
        <div className='dot'>...</div>
        }
        {lastArr.length > 0 &&
            <PaginationPage jum={jum} activepage={activepage} item={lastArr[0] - 1} key={5} />
        } 
    </div>
  )
}

export default MoviePagination