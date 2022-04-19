import React, { useRef, useState } from 'react'
import './CreateMovieDetail.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {isFailing, isLoading, isSuccess} from '../redux/slice/AuthSlice';
import axios from 'axios';
const CraeteMovieDetaile = () => {

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
    const [Image,setImage] = useState("https://bloganchoi.com/wp-content/uploads/2022/03/gau-do-2.jpg");

    const handleCreateNewMovie = async () => {
        const movie = {
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
            backgroundimg:imageRef.current.files[0],
        }
        if(!movie.viettitle || !movie.englishtitle || !movie.description || !movie.trailer||
            !movie.times || !movie.NSX || !movie.categary || !movie.country || !movie.kind || !movie.rating 
            || !movie.reviewer || !movie.status || !movie.backgroundimg){
            return toast.error("Vui lòng điền vào hết các ô.");
        }
        const formData = new FormData();
        formData.append("file",movie.backgroundimg);
        formData.append("upload_preset","pxpqedfh");
        dispatch(isLoading());
        try{
            const res = await axios.post("https://api.cloudinary.com/v1_1/dqbrxkux1/image/upload",formData);
            movie.backgroundimg = res.data.url;
        }
        catch(err){
            dispatch(isFailing());
        }
        dispatch(isLoading());
        try{
            const res = await axios.post(`/api/movie/create`,{
                viettitle:movie.viettitle,
                englishtitle:movie.englishtitle,
                description:movie.description,
                trailer:movie.trailer,
                times:movie.times,
                NSX:movie.NSX,
                country:movie.country,
                kind:movie.kind,
                rating:movie.rating,
                categary:movie.categary,
                reviewer:movie.reviewer,
                status:movie.status,
                backgroundimg:movie.backgroundimg,
            },{
                headers:{
                    token:`Bearer ${auth.user.accessToken}`
                }
            });
            dispatch(isSuccess());
            toast.success(res.data.msg);
        }
        catch(err){
            dispatch(isFailing());
        }
        vietTitleRef.current.value = "";
        englishTitleRef.current.value = "";
        descriptionRef.current.value = "";
        iFrameRef.current.value = "";
        timesRef.current.value = "";
        countryRef.current.value = "";
        NSXRef.current.value = "";
        kindRef.current.value = "";
        ratingRef.current.value = "";
        categaryRef.current.value = "";
        reviewerRef.current.value = "";
        statusRef.current.value = "";
    }

    const handleImage = (e) => {
        const url = URL.createObjectURL(e[0]);
        setImage(url);
    }

  return (
    <div className='grid wide'>
        <div className='row'>
            <div className='col c-10 m-10 l-10 c-o-1 m-o-1 l-o-1'>
                <div className='create_detail-container'>
                    <div className='create_detail-img'>
                        <img src={Image} />
                        <div className='created_detail-input'>
                            <label htmlFor="image">
                                <FontAwesomeIcon style={{marginRight:"0.5rem"}} icon={faImage} />
                                Ảnh
                            </label>
                            <input onChange={(e) => handleImage(e.target.files)} ref={imageRef} style={{display:"none"}} id="image" type="file"/>
                        </div>
                    </div>
                    <div className='create_detail-form'>
                        <h1>Tạo Movie</h1>
                        <div className='create_detail-viettitle'>
                            <input defaultValue={vietTitleRef.current.value} ref={vietTitleRef} type="text" placeholder='Tên Tiếng Việt'/>
                        </div>
                        <div className='create_detail-englishtitle'>
                            <input defaultValue={englishTitleRef.current.value} ref={englishTitleRef} type="text" placeholder='Tên Tiếng Anh'/>
                        </div>
                        <div className='create_detail-description'>
                            <textarea defaultValue={descriptionRef.current.value} ref={descriptionRef} placeholder='Nhập Nội Dung'/>
                        </div>
                        <div className='create_detail-trailer'>
                            <input defaultValue={iFrameRef.current.value} ref={iFrameRef} type="text" placeholder='Nhập iframe trailer' />
                        </div>
                        <div className='create_detail-times'>
                            <input defaultValue={timesRef.current.value} ref={timesRef} type="text" placeholder='Thời Lượng Phim' />
                        </div>
                        <div className='create_detail-nsx'>
                            <input defaultValue={NSXRef.current.value} ref={NSXRef} type="text" placeholder='Năm Sản Xuất' />
                        </div>
                        <div className='create_detail-country'>
                            <input defaultValue={countryRef.current.value} ref={countryRef} type="text" placeholder='Quốc Gia' />
                        </div>
                        <div className='create_detail-categary'>
                            <input defaultValue={categaryRef.current.value} ref={categaryRef} type="text" placeholder='Thể Loại' />
                        </div>
                        <div className='create_detail-rating'>
                            <input defaultValue={ratingRef.current.value} ref={ratingRef} minLength={0} type="number" placeholder='Số Sao' />
                        </div>
                        <div className='create_detail-reviewer'>
                            <input defaultValue={reviewerRef.current.value} ref={reviewerRef} minLength={0} type="number" placeholder='Số Lượng Người Đánh Giá' />
                        </div>
                        <div className='create_detail-status'>
                            <input defaultValue={statusRef.current.value} ref={statusRef} type="text" placeholder='Tình Trạng' />
                        </div>
                        <select ref={kindRef} className='create_detail-kind'>
                            <option value="oldmovie">Phim Lẻ</option>
                            <option value="seriesmovie">Phim Bộ</option>
                        </select>
                        <div className='create_detail-button'>
                            <button onClick={handleCreateNewMovie}>Tạo Movie</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CraeteMovieDetaile