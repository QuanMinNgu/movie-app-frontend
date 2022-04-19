import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const usePagination = ({total,limit}) => {

    const navigate = useNavigate();
    const num = Math.ceil(total/limit);
    const [page,setPage] = useState(1);
    const [firstArr,setFirstArr] = useState([]);
    const [lastArr,setLastArr] = useState([]);

    const jum = (page) => {
        setPage(page);
    }

    useEffect(() => {
        const newArry = [...Array(num)].map((item,index) => index + 1);
        if(num - page >= 4){
            setFirstArr(newArry.slice(page - 1,page + 2));
            setLastArr(newArry.slice(num-1));
        }
        else{
            setFirstArr(newArry.slice(num - 4));
            setLastArr([]);
        }
    },[total,limit,page]);

    useEffect(() => {
        navigate(`?page=${page}`);
    },[page])
    const activepage = (e) => {
        if(e === page){
            return 'active';
        }
    }

  return {jum,activepage,num,firstArr,lastArr}
}

export default usePagination