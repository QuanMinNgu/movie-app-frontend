import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Header.css';
import {useDispatch, useSelector} from 'react-redux';
import {isFailing, isLoading, isLogOut} from '../redux/slice/AuthSlice';
import {toast} from 'react-toastify';
import axios from 'axios';
const Header = () => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        dispatch(isLoading());
        try{
            const res = await axios.post(`/api/auth/logout`,"");
            dispatch(isLogOut());
            toast.success(res.data.msg);
        }
        catch(err){
            toast.error(err.response.data.msg);
            dispatch(isFailing());
        }
    }
  return (
    <div className='header_container'>
        <div className='grid wide h_100'>
            <div className='row h_100'>
                <div className='col c-4 m-4 l-4'>
                    <Link className='Link' to='/'>
                        <div className='brand_container'>
                            <img style={{cursor:"pointer"}} src="https://res.cloudinary.com/dqbrxkux1/image/upload/v1650157426/oldMovie/ekuglqbtpp7onkcf9tjm.png"/>
                            <span style={{cursor:"pointer"}}>OLD MOVIE</span>
                        </div>
                    </Link>
                </div>
                <div className='col c-8 m-8 l-8'>
                    <div className='search_container'>
                        <div className='search_form'>
                            <input type="text" placeholder='Nhập tên diễn viên, phim'/>
                            <div className='icon_search'>
                                <FontAwesomeIcon style={{cursor:"pointer"}} icon={faMagnifyingGlass} />
                            </div>
                        </div>
                        {auth.user && 
                        <div onClick={handleLogOut} className='logout'>
                            Log Out    
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header