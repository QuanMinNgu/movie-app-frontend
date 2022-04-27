import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {isFailing, isLoading, isSuccess} from '../components/redux/slice/AuthSlice';
import axios from 'axios';
import CommentDetail from './CommentDetail';
const CommentWatch = ({socket}) => {

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
    const content = contentRef.current.value;
    contentRef.current.value= "";
    if(socket){
      socket.emit("createComment",{name:nameRef.current.value,content:content,room:slug});
    }
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
          <CommentDetail key={item._id + "A"} item={item}/>
        ))}
      </div>
    </div>
  )
}

export default CommentWatch