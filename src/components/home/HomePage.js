import React from 'react'
import Home from './Home';
import './HomePage.css';
const HomePage = ({cache}) => {
  return (
    <div className='home_container'>
      <Home cache={cache}/> 
    </div>
  )
}

export default HomePage