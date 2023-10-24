import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle } from 'react-icons/bi'
import { MdOutlineStar, MdOutlineStarHalf, MdOutlineStarOutline } from 'react-icons/md';
import { BarChart } from '../BarChart';
export const BookModal = ({ book, onClose }) => {
    
    const data={
        "1":book.ratings_1 ?? 0,
        "2":book.ratings_2 ?? 0,
        "3":book.ratings_3 ?? 0,
        "4":book.ratings_4 ?? 0,
        "5":book.ratings_5 ?? 0,

    } 
    console.log(data)
    return (
        <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose}>
            <div onClick={(event) => event.stopPropagation()} className='w-[600px] max-w-full h-[400px] bg-slate-600 rounded-xl p-4 flex flex-col relative border-2 border-gray-500'>
                <AiOutlineClose className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer' onClick={onClose} />
                <div className='flex justify-start flex-col'>
                <div className='flex justify-start items-center gap-x-2 text-white'>
                    <PiBookOpenTextLight className=' text-2xl text-gray-400' />
                    <h2 className='my-1 ' >{book.title}</h2>
                </div>
                <div className='flex justify-start items-center gap-x-2 text-white'>
                    <BiUserCircle className=' text-2xl text-gray-400' />
                    <h2 className='my-1 ' >{book.authors}</h2>

                </div>
                <div className='flex justify-start items-center gap-x-2 text-white ml-1'>
                {book.average_rating >= 4 ? <MdOutlineStar className='text-yellow-300 '/> : book.average_rating >= 2 ? <MdOutlineStarHalf className='text-yellow-300 '/> : <MdOutlineStarOutline className='text-yellow-300' />}
                {book.average_rating} / 5
            </div>
                <div className='flex justify-start items-center gap-x-2 text-white ml-1'>
                <BarChart data={data}/>
                </div>
            </div>
            </div>
        </div>
    )
}
