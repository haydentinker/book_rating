import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { BookModal } from './BookModal';
export const BookSingleCard = ({ book }) => {
    const [showModal,setShowModal]=useState(false)
    return (
        <div key={book._id} className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:bg-slate-600 bg-slate-700' onClick={()=>setShowModal(!showModal)}>
            <div className='flex justify-center'>
            <img 
                src={book.image_url}
                alt={`${book.title} cover picture`}
                />
                </div>
            <div className='flex justify-center books-center gap-x-2'>
                <h2 className='my-1 text-xl text-white' >{book.title}</h2>
            </div>
            <div className='flex justify-center books-center gap-x-2 text-white'>
                <h2 className='my-1' >{book.authors}</h2>
            </div>
            
            {showModal && (
                <BookModal book={book} onClose={() => setShowModal(false)}/>
                    )}
        </div>
    )
}
