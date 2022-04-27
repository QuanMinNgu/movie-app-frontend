import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp,faTimes} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { isFailing, isLoading, isSuccess } from '../components/redux/slice/AuthSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const CommentDetail = ({item}) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const handleDeleteComment = async () => {
      dispatch(isLoading());
      try{
        const res = await axios.delete(`/api/comment/delete/${item._id}`,{
          headers:{
            token:`Bearer ${auth.user?.accessToken}`
          }
        })
        toast.success(res.data.msg);
        dispatch(isSuccess());
      }
      catch(err){
        toast.error(err.response.data.msg);
        dispatch(isFailing());
      }
  }
  return (
    <div className='comment_form-user'>
        <img src="https://res.cloudinary.com/dqbrxkux1/image/upload/v1650375524/Avatar/slmwykpmqerrgu6pl8kc.webp"/>
        <div className='comment-name-content'>
        <span className='name-user'>{item?.name}</span>
        <p>{item?.content}</p>
          <div className='like-reply'>
              <span className='dot-having'>
              <FontAwesomeIcon style={{marginRight:"0.3rem"}} icon={faThumbsUp} />
              Thích
              </span>
              <p>.</p>
              <span className='dot-having'>Phản Hồi</span>
              <p>.</p>
              <span style={{cursor:"default"}}>{moment(item?.createdAt).fromNow()}</span>
          </div>
        </div>
        {auth.user && 
        <div onClick={handleDeleteComment} className='delete_comment'>
          <FontAwesomeIcon icon={faTimes} />
        </div>}
    </div>
  )
}

export default CommentDetail