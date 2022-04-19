import React from 'react'
import './CommentNavBar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileLines} from '@fortawesome/free-solid-svg-icons';
const CommentNavBar = () => {
  return (
    <div className='comment_navbar'>
        <FontAwesomeIcon style={{marginRight:"1rem"}} icon={faFileLines} />
        BÌNH LUẬN PHIM
    </div>
  )
}

export default CommentNavBar