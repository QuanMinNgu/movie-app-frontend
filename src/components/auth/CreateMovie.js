import React from 'react'
import './CreateMovie.css';
import {Link} from 'react-router-dom';
const CreateMovie = () => {
  return (
    <div className='col c-6 m-4 l-3'>
        <Link to='/movie/create' className='Link'>
            <div className='create_card'>
                <span>Tạo Movie Mới</span>
            </div>
        </Link>
    </div>
  )
}

export default CreateMovie