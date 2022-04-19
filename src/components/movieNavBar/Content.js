import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye,faStar} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
const Content = ({item}) => {
  return (
    <Link to={`/${item.slug}`} className='Link'>
      <div className='content'>
            <img src={item?.backgroundimg} />

          <div className='content_detail'>
          <p className='name_movie'>{item?.viettitle}</p>
          <p className='e_name'>{item?.englishtitle}</p>
          <p className='watch_content'>
              <FontAwesomeIcon style={{marginRight:"0.4rem"}} icon={faEye} />
              961 lượt xem
          </p>
          <p className='star_content'>
              <FontAwesomeIcon class="star_c" icon={faStar} />
              <FontAwesomeIcon class="star_c" icon={faStar} />
              <FontAwesomeIcon class="star_c" icon={faStar} />
              <FontAwesomeIcon class="star_c" icon={faStar} />
              <FontAwesomeIcon class="star_c" icon={faStar} />
          </p>
          </div>
      </div>
    </Link>
  )
}

export default Content