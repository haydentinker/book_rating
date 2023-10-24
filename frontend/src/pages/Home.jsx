import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { BooksCard } from '../components/home/BooksCard';
import { BooksTable } from '../components/home/BooksTable';
import { useAuth } from '../context/AuthContext';
export const Home = () => {
    const { token, setToken } = useAuth();
    const [books, setBooks] = useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [currentLimit,setCurrentLimit]=useState(10);
    const [sortBy,setSortBy]=useState('default')
    const [loading, setLoading] = useState(false);
    const [showType,setShowType]=useState('table')
    
    const handlePagination= (newPage) => {
        if (!(currentPage===1 && newPage===-1)){
            setCurrentPage(currentPage+newPage);
        }
    }
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books'
               
            ,{  
                params:{
                    page:currentPage,
                    limit:currentLimit,
                    sortBy:sortBy
                }
            })
            .then((response) => {
                setBooks(response.data.data);

                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [currentPage,currentLimit,sortBy]);
    return (
        <div className='p4-4 '>
            
            <div className='flex justify-center items-center'>
                <h1 className='text-4xl my-8 text-white'>Books</h1>
            </div>
            <div className='flex justify-center items-center gap-x-4 '>
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={()=>setShowType('table')}>Table</button>
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={()=>setShowType('card')}>Card</button>
                <select value={currentLimit} onChange={(e)=>setCurrentLimit(e.target.value)}>
                    <option value='10'>10</option>
                    <option value='20'>20</option>
                    <option value='30'>30</option>
                </select>
                <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
                    <option value='default'>Default</option>
                    <option value='title'>Title</option>
                    <option value='authors'>Author</option>
                </select>
            </div>
            {loading ? (
                <Spinner />
            ) : showType==='table' ? (
                <BooksTable books={books}/>
                
            ):(<BooksCard books={books}/>)
            }<div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg mr-2' onClick={()=>handlePagination(-1)}>Previous Page</button>
            <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg ml-2' onClick={()=>handlePagination(1)}>Next Page</button>
            </div>
        </div>
    )
}
