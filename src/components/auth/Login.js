import React, { useRef } from 'react'
import './Login.css';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {isFailing, isLoading, isLogin} from '../redux/slice/AuthSlice';
const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const user = {
            email:emailRef.current.value,
            password:passwordRef.current.value
        }
        if(!user.email || !user.password){
            return toast.error("Vui lòng điền tất cả thông tin.");
        }
        if(user.password.length < 6){
            return toast.error("Mật khẩu cần dài hơn 6 kí tự.");
        }
        dispatch(isLoading());
        try{
            const res = await axios.post(`/api/auth/login`,{
                email:user.email,
                password:user.password
            });
            toast.success(res.data.msg);
            dispatch(isLogin(res.data));
            navigate('/');
        }
        catch(err){
            toast.error(err.response.data.msg);
            dispatch(isFailing());
        }
    }
  return (
    <div className='grid wide'>
        <div className='row'>
            <div className='col c-10 m-20 l-10 c-o-1 m-o-1 l-o-1'>
                <div className='login_form'>
                    <div className='row h_100'>
                        <div className='col c-4 m-4 l-4 h_100'>
                            <div className='img_login'>
                                <img src="https://res.cloudinary.com/dqbrxkux1/image/upload/v1650157426/oldMovie/ekuglqbtpp7onkcf9tjm.png" />
                            </div>
                        </div>
                        <div className='col l-8 m-8 c-8'>
                            <div className='login_form_input'>
                                <div className='login_input'>
                                    <h1>Đăng Nhập</h1>
                                    <div className='email'>
                                        <input ref={emailRef} className='input' type="email" placeholder='Email'/>
                                    </div>
                                    <div className='password'>
                                        <input ref={passwordRef} className='input' type="password" placeholder='Mật Khẩu'/>
                                    </div>
                                    <div className='button_form'>
                                        <button onClick={handleLogin}>Đăng Nhập</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login