import React,{useState} from 'react'

export const SearchBar = ({handleSearch}) => {
    const [searchInput,setSearchInput]=useState("");
    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
      };
    const handleSubmit=(event)=>{
        event.preventDefault();
        handleSearch(searchInput);
    }
  return (
    <form onSubmit={handleSubmit}>
    <input
   type="text"
   placeholder="Search here"
   value={searchInput} 
   onChange={handleInputChange}/>
   <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg ml-3'  type='submit'>Search</button>
   </form>
  )
}
