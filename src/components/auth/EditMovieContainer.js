import React from 'react'
import './EditMovieContainer.css';
import EditDetail from './EditDetail';
const EditMovieContainer = () => {

  return (
    <div className='grid wide'>
        <div className='row'>
            <div className='c-10 l-10 m-10 c-o-1 m-o-1 l-o-1'>
                <EditDetail />
            </div>
        </div>
    </div>
  )
}

export default EditMovieContainer