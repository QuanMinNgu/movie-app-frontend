import React, { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const FormFilter = () => {

    const yearRef = useRef();
    const orderRef = useRef();
    const kindRef = useRef();
    const countryRef = useRef();
    const navigate = useNavigate();
    const {search} = useLocation();
    const page = new URLSearchParams(search).get("page");
    const handleChange = () => {
        const newlo = {
            page:1,
            NSX:yearRef.current.value || '',
            sort:orderRef.current.value || '',
            country:countryRef.current.value || ''
        };
        const Arr = ['page','sort','NSX','kind'];
        Arr.forEach(item => {
            if(newlo[item] === ''){
                delete(newlo[item]);
            }
        })
        const newUrl = new URLSearchParams(newlo).toString();
        navigate(`?${newUrl}`);
    }
  return (
    <div className='form-filter'>
        <select ref={orderRef} className='order'>
            <option value="">-- Sắp Xếp --</option>
            <option value="-createdAt">Mới Cập Nhật</option>
            <option value="createdAt">Cũ Nhất</option>
            <option value="-NSX">Năm Sản Xuất</option>
        </select>
        <select ref={kindRef} className='kind'>
            <option value="">-- Loại --</option>
            <option value="oldmovie">Phim Lẻ</option>
            <option value="seriesmovie">Phim Bộ</option>
        </select>
        <select className='categary'>
            <option>--Thể Loại--</option>
            <option>Phim Lẻ</option>
            <option>Phim Bộ</option>
        </select>
        <select ref={countryRef} className='country'>
            <option>--Quốc Gia --</option>
            <option value="Hoa Kỳ">Hoa Kỳ</option>
            <option value="Việt Nam">Việt Nam</option>
            <option value="Nhật Bản">Nhật Bản</option>
        </select>
        <select ref={yearRef} className='year'>
            <option value="">--Năm --</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
        </select>
        <button onClick={handleChange} className='form_filter-button'>Lọc Phim</button>
    </div>
  )
}

export default FormFilter