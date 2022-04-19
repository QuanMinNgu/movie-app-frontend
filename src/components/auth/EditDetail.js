import React, { useEffect, useRef, useState } from 'react'
import './EditDetail.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import {isFailing,isLoading,isSuccess} from '../redux/slice/AuthSlice';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
const EditDetail = () => {

    const {slug} = useParams();
    const auth = useSelector(state => state.auth);
    const imageRef = useRef("");
    const vietTitleRef = useRef("");
    const englishTitleRef = useRef("");
    const descriptionRef = useRef("");
    const iFrameRef = useRef("");
    const timesRef = useRef("");
    const NSXRef = useRef("");
    const countryRef = useRef("");
    const kindRef = useRef("");
    const ratingRef = useRef("");
    const reviewerRef = useRef("");
    const statusRef = useRef("");
    const categaryRef = useRef("");
    const dispatch = useDispatch();
    const [movie,setMovie] = useState();
    const [Image,setImage] = useState("");

    useEffect(() => {
        let here =  true;
        dispatch(isLoading());
        axios.get(`/api/movie/${slug}`)
            .then(res => {
                dispatch(isSuccess());
                setMovie(res.data.movie);
                setImage(res.data.movie.backgroundimg);
            })
            .catch(err => {
                dispatch(isFailing());
            })
        return () => {
            here = false;
        }
    },[]);

    const handleEdit = async () => {
        let Image;
        if(imageRef.current.files[0]){
            const formData = new FormData();
            formData.append("file",imageRef.current.files[0]);
            formData.append("upload_preset","pxpqedfh");
            dispatch(isLoading());
            try{
                const res = await axios.post("https://api.cloudinary.com/v1_1/dqbrxkux1/image/upload",formData);
                Image = res.data.url;
                dispatch(isSuccess());
            }
            catch(err){
                dispatch(isFailing());
            }
        }
        dispatch(isLoading());
        try{
            const res = await axios.put(`/api/movie/update/${movie?.slug}`,{
                viettitle:vietTitleRef.current.value,
                englishtitle:englishTitleRef.current.value,
                description:descriptionRef.current.value,
                trailer:iFrameRef.current.value,
                times:timesRef.current.value,
                NSX:NSXRef.current.value,
                country:countryRef.current.value,
                kind:kindRef.current.value,
                rating:ratingRef.current.value,
                categary:categaryRef.current.value,
                reviewer:reviewerRef.current.value,
                status:statusRef.current.value,
                backgroundimg:Image
            },{
                headers:{
                    token:`Bearer ${auth.user?.accessToken}`
                }
            })
            toast.success(res.data.msg);
            dispatch(isSuccess());
        }
        catch(err){
            dispatch(isFailing());
            toast.error(err.response.data.msg);
        }
    }

    const handleImage = (e) => {
        const url = URL.createObjectURL(e[0]);
        setImage(url);
    }
  return (
    <div className='edit_movie_container'>
        <div className='edit_movie-img'>
            <img src={Image} />
            <div className='edit_movie-input'>
                <label className='label_edit-movie' htmlFor='input_avatar'>
                    <FontAwesomeIcon style={{marginRight:"0.5rem"}} icon={faImage} />
                    Ảnh
                </label>
                <input ref={imageRef} onChange={(e) => handleImage(e.target.files)} id='input_avatar' type="file" style={{display:"none"}}/>
            </div>
        </div>
        <div className='create_detail-form'>
            <h1>{movie?.viettitle}</h1>
            <div className='create_detail-viettitle'>
                <input defaultValue={movie?.viettitle} ref={vietTitleRef} type="text" placeholder='Tên Tiếng Việt'/>
            </div>
            <div className='create_detail-englishtitle'>
                <input defaultValue={movie?.englishtitle} ref={englishTitleRef} type="text" placeholder='Tên Tiếng Anh'/>
            </div>
            <div className='create_detail-description'>
                <textarea defaultValue={movie?.description} ref={descriptionRef} placeholder='Nhập Nội Dung'/>
            </div>
            <div className='create_detail-trailer'>
                <input defaultValue={movie?.trailer} ref={iFrameRef} type="text" placeholder='Nhập iframe trailer' />
            </div>
            <div className='create_detail-times'>
                <input defaultValue={movie?.times} ref={timesRef} type="text" placeholder='Thời Lượng Phim' />
            </div>
            <div className='create_detail-nsx'>
                <input defaultValue={movie?.NSX} ref={NSXRef} type="text" placeholder='Năm Sản Xuất' />
            </div>
            <div className='create_detail-country'>
                <input defaultValue={movie?.country} ref={countryRef} type="text" placeholder='Quốc Gia' />
            </div>
            <div className='create_detail-categary'>
                <input defaultValue={movie?.categary} ref={categaryRef} type="text" placeholder='Thể Loại' />
            </div>
            <div className='create_detail-rating'>
                <input defaultValue={movie?.rating} ref={ratingRef} minLength={0} type="number" placeholder='Số Sao' />
            </div>
            <div className='create_detail-reviewer'>
                <input defaultValue={movie?.reviewer} ref={reviewerRef} minLength={0} type="number" placeholder='Số Lượng Người Đánh Giá' />
            </div>
            <div className='create_detail-status'>
                <input defaultValue={movie?.status} ref={statusRef} type="text" placeholder='Tình Trạng' />
            </div>
            <select ref={kindRef} className='create_detail-kind'>
                <option selected={`${movie?.kind === 'oldmove' ? 'selected' : ""}`} value="oldmovie">Phim Lẻ</option>
                <option selected={`${movie?.kind === 'seriesmovie' ? 'selected' : '' }`} value="seriesmovie">Phim Bộ</option>
            </select>
            <div className='create_detail-button'>
                <button onClick={handleEdit}>Sửa Movie</button>
            </div>
        </div>
    </div>
  )
}

export default EditDetail