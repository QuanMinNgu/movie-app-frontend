import React from 'react'
import './NavBar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHouse,faBolt,faFolder,faEarthAsia,faFilm,faVideo} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
const NavBar = () => {
  return (
    <div className='navBar_container'>
        <div className='grid wide h_100'>
            <div className='row h_100'>
                <div className='col c-1 m-1 l-1'>
                    <div className='home_icon'>
                    <Link to='/' style={{color:"#FD7337"}} className='Link'>
                        <FontAwesomeIcon icon={faHouse} />
                    </Link>
                    </div>
                </div>
                <div className='col c-2 m-2 l-2'>
                    <div className="navbar_choise">
                        <Link to='/danh-sach/new-movie' style={{color:"#FD7337"}} className='Link'>
                        <FontAwesomeIcon style={{marginRight:"1rem"}} icon={faBolt} />
                        <span>Phim Mới</span>
                        </Link>
                    </div>
                </div>
                <div className='col c-2 m-2 l-2'>
                    <div className="navbar_choise">
                        <FontAwesomeIcon icon={faFolder} />
                        <span>Thể Loại</span>
                    </div>
                </div>
                <div className='col c-2 m-2 l-2'>
                    <div className="navbar_choise">
                        <FontAwesomeIcon icon={faEarthAsia} />
                        <span>Quốc Gia</span>
                    </div>
                </div>
                <div className='col c-2 m-2 l-2'>
                    <div className="navbar_choise">
                    <Link to='/danh-sach/oldmovie' style={{color:"#FD7337"}} className='Link'>
                        <FontAwesomeIcon style={{marginRight:"1rem"}} icon={faFilm} />
                        <span>Phim Lẻ</span>
                    </Link>
                    </div>
                </div>
                <div className='col c-2 m-2 l-2'>
                    <div className="navbar_choise">
                    <Link to='/danh-sach/seriesmovie' style={{color:"#FD7337"}} className='Link'>
                        <FontAwesomeIcon style={{marginRight:"1rem"}} icon={faVideo} />
                        <span>Phim Bộ</span>
                    </Link>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default NavBar