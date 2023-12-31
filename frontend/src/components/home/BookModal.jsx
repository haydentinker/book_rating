import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle } from 'react-icons/bi'
import StarRatings from 'react-star-ratings';
import { MdOutlineStar, MdOutlineStarHalf, MdOutlineStarOutline } from 'react-icons/md';
import { BarChart } from '../BarChart';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const BookModal = ({ book, onClose }) => {
    const navigate=useNavigate();
    const currentUser = useAuth()
    const [loading, setLoading] = useState(false)
    const [userRating, setUserRating] = useState(-1);
    const [rating, setRating] = useState(null)
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/rating/book/${book._id}`, {
                headers: {
                    Authorization: `Bearer ${currentUser}`,
                },
            })
            .then((response) => {
                if (response.data.rating !== null) {
                    setUserRating(response.data.rating.rating); 
                    setRating(response.data.rating)
                }
                
            })
            setLoading(false);
    }, []);
    useEffect(() => {
        if (userRating !== -1 && userRating !== rating?.rating) {
            setLoading(true);
    
            if (rating === null) {
                axios
                    .post(
                        'http://localhost:5555/rating',
                        { book_id: book._id, rating: userRating },
                        {
                            headers: {
                                Authorization: `Bearer ${currentUser}`,
                            },
                        }
                    )
                    .then((response) => {
                        setRating(response.data.rating);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                    });
            } else {
                axios
                    .put(
                        `http://localhost:5555/rating/${rating._id}`,
                        { rating: userRating },
                        {
                            headers: {
                                Authorization: `Bearer ${currentUser}`,
                            },
                        }
                    )
                    .then((response) => {
                        setRating(response.data.rating);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                    });
            }
        }
    }, [userRating]);
    const data = {
        "1": book.ratings_1 ?? 0,
        "2": book.ratings_2 ?? 0,
        "3": book.ratings_3 ?? 0,
        "4": book.ratings_4 ?? 0,
        "5": book.ratings_5 ?? 0,

    }
    const handleLoginButton=()=>{
        navigate('/login')
    }
    const handleChangeRating = (rating) => {
        setUserRating(rating);
    }
    return (
        <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose}>
            <div onClick={(event) => event.stopPropagation()} className='w-[600px] max-w-full bg-slate-600 rounded-xl p-4 flex flex-col relative border-2 border-gray-500 '>
                <AiOutlineClose className='absolute right-6 top-3 text-2xl text-red-600 cursor-pointer' onClick={onClose} />

                <div className='flex justify-start flex-col'>
                    <div className='flex justify-start items-center gap-x-2 text-white'>
                        <PiBookOpenTextLight className=' text-2xl text-gray-400' />
                        <h2 className='my-1 ' >{book.title}</h2>
                    </div>
                    <div className='flex justify-start items-center gap-x-2 text-white'>
                        <BiUserCircle className=' text-2xl text-gray-400' />
                        <h2 className='my-1 ' >{book.authors}</h2>

                    </div>
                    <div className='flex flex-col justify-start items-start gap-x-2 text-white ml-1'>
                        <div className='flex items-center gap-x-2'>
                            {book.average_rating >= 4 ? <MdOutlineStar className='text-yellow-300 ' /> : book.average_rating >= 2 ? <MdOutlineStarHalf className='text-yellow-300 ' /> : <MdOutlineStarOutline className='text-yellow-300' />}
                            {book.average_rating} / 5
                        </div>
                        <div className='whitespace-nowrap'>
                            {currentUser!=null ? 
                            <h3>
                                Your Rating: <StarRatings changeRating={handleChangeRating} starDimension='20px' starSpacing='5px' starHoverColor='white' starRatedColor='yellow' starEmptyColor='black' rating={userRating} />
                            </h3>:
                             <button className='text-white border border-gray-300 px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-800 my-2' onClick={handleLoginButton}>Login to rate book</button>
                            }

                        </div>

                    </div>
                    <div className='flex justify-start items-center gap-x-2 text-white ml-1 bg-slate-200'>
                        <BarChart data={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}
