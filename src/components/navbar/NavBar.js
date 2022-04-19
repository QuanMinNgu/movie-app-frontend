import React from 'react'
import './NavBar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHouse,faBolt,faFolder,faEarthAsia,faFilm,faVideo} from '@fortawesome/free-solid-svg-icons';
const NavBar = () => {
  return (
    <div className='navBar_container'>
        <div className='grid wide h_100'>
            <div className='row h_100'>
                <div className='col c-1 m-1 l-1'>
                    <div className='home_icon'>
                        <FontAwesomeIcon icon={faHouse} />
                    </div>
                </div>
                <div className='col c-2 m-2 l-2'>
                    <div className="navbar_choise">
                        <FontAwesomeIcon icon={faBolt} />
                        <span>Phim Mới</span>
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
                        <FontAwesomeIcon icon={faFilm} />
                        <span>Phim Lẻ</span>
                    </div>
                </div>
                <div className='col c-2 m-2 l-2'>
                    <div className="navbar_choise">
                        <FontAwesomeIcon icon={faVideo} />
                        <span>Phim Bộ</span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default NavBar