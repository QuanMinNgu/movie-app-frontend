import React, { useEffect, useRef, useState } from 'react'
import './Card.css';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import axios from'axios';
import {isFailing, isLoading, isSuccess} from '../redux/slice/AuthSlice';
import {toast} from 'react-toastify';
const Card = ({item}) => {

  const auth = useSelector(state => state.auth);
  const [deleteConfir,setDelteConfir] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Image = useRef();
  useEffect(() => {
    const img = Image.current;
    const obj = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        img.setAttribute('src',img.alt);
      }
    })
    if(img){
      obj.observe(img);
    }

    return () => {
      if(img){
        obj.unobserve(img);
      }
    }
  },[]);


  const handleDelete = async () => {
    dispatch(isLoading());
    try{
      const res = await axios.delete(`/api/movie/delete/${item?.slug}`,{
        headers:{
          token:`Bearer ${auth.user?.accessToken}`
        }
      })
      dispatch(isSuccess());
      toast.success(res.data.msg);
    }
    catch(err){
      dispatch(isFailing());
      toast.error(err.response.data.msg);
    }
  }

  const handleEdit = () => {
    navigate(`/edit/${item?.slug}`);
  }
  return (
    <div className='col c-6 m-4 l-3 card_containter'>
      <a className='Link' href={`/${item?.slug || "asdasd"}`}>
        <div className='card_movie'>
            <img ref={Image} alt={item?.backgroundimg || "https://rapchieuphim.com/photos/8925/274805339_7122652217807653_1178248497235061966_n.jpg"}/>
            <div className='card_movie_detail'>
                <span>{item?.viettitle || "Gấu Đỏ Biến Hình"}</span>
                <p>{item?.englishtitle || 'Red Panda (2022)'}</p>
            </div>
          <div className='date_movie'>
            <span>{item?.status || "Full"}</span>
          </div>
        </div>
      </a>
      {auth.user && 
      <div className='edit_container'>
        <button onClick={() => setDelteConfir(true)} className='delete_btn'>Xóa</button>
        <button onClick={handleEdit} className='edit_btn'>Sửa</button>
      </div>}
      {deleteConfir && (<div className='delete_confir'>
          <div className='confir_form'>
              <h1>Bạn có thực sự muốn xóa {item?.viettitle} ?</h1>
              <div className='button_confir'>
                <button onClick={() => setDelteConfir(false)} className='cancel_btn-confir'>Hủy</button>
                <button onClick={handleDelete} className='delete_btn-confir'>Xóa</button>
              </div>
          </div>
      </div>)}
    </div>
  )
}

export default Card