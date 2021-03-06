import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import './Comment.css';
import CommentUser from '../../comments/CommentUser';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {isFailing, isLoading, isSuccess} from '../redux/slice/AuthSlice';
import axios from 'axios';
const Comment = ({socket}) => {

  const nameRef = useRef();
  const contentRef = useRef("");
  const dispatch = useDispatch();
  const {slug} = useParams();
  const [comment,setComment] = useState();
  const trigger = useRef(false);

  useEffect(() => {
    dispatch(isLoading());
    axios.get(`/api/comment/${slug}`)
      .then(res => {
        dispatch(isSuccess());
        setComment(res.data.comments);
        trigger.current = true;
      })
      .catch(() => {
        dispatch(isFailing());
      })
  },[slug]);

  useEffect(() => {
    if(trigger){
      if(socket){
        socket.on('clientGetComment',user => {
          setComment([user,...comment]);
        })
      }
    }
    return () => {
      if(trigger){
        if(socket){
          socket.off("clientGetComment");
        }
      }
    }
  },[socket,comment]);
  const handleComment = () => {
    if(!nameRef.current.value || !contentRef.current.value){
      return toast.error("Vui lòng điện hết vào ô trống.");
    }
    if(socket){
      socket.emit("createComment",{name:nameRef.current.value,content:contentRef.current.value,room:slug});
    }
    contentRef.current.value = "";
  }
  return (
    <div className='comment_from'>
      <div className='comment_user'>
        <img src="https://res.cloudinary.com/dqbrxkux1/image/upload/v1650375524/Avatar/slmwykpmqerrgu6pl8kc.webp" />
        <div className='input_form_comment'>
          <div className='user_name'>
            <input ref={nameRef} type="text" placeholder='Nhập Tên'/>
          </div>
          <div className='user_content'>
            <textarea defaultValue={contentRef.current.value} ref={contentRef} type="text" placeholder='Nhập Nội Dung' />
          </div>
        </div>
        <div className='button_comment'>
          <button onClick={handleComment}>Comment</button>
        </div>
      </div>
      <div className='comment_aready'>
        {comment?.map(item => (
          <CommentUser item={item} key={item._id}/>
        ))}
      </div>
    </div>
  )
}

export default Comment