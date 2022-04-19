import React from 'react'
import './CategaryDetail.css';
const CategaryDetail = ({img}) => {
  return (
    <div className='categary_container'>
        <img src={img} />
    </div>
  )
}

export default CategaryDetail