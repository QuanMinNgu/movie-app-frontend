import React from 'react'

const PaginationPage = ({jum,activepage,item}) => {
  return (
    <div onClick={() => jum(item + 1)} className={`pagination_page ${activepage(item + 1)}`}>{item + 1}</div>
  )
}

export default PaginationPage