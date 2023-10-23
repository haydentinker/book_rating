import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineStar, MdOutlineStarHalf, MdOutlineStarOutline } from 'react-icons/md';
export const BooksTable = ({ books }) => {
    return (
        <table className='w-full border-separate border-spacing-2'>
            <thead>
                <tr>
                    <th className='border border-slate-600 rounded-md'>Title</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
                    <th className='border border-slate-600 rounded-md'>Reviews</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <tr key={book._id} className='h-8'>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {book.title}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                            {book.authors}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                            {book.original_publication_year}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center max-md:hidden' >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span>{book.average_rating}</span>
                                <span>
                                    {book.average_rating >= 4 ? <MdOutlineStar className='text-yellow-300'/> : book.average_rating >= 2 ? <MdOutlineStarHalf className='text-yellow-300'/> : <MdOutlineStarOutline className='text-yellow-300' />}
                                </span>
                            </div>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    )
}
