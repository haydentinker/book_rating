import React from 'react'
import { Route,Routes } from 'react-router';
import { Home } from './pages/Home.jsx';
import { CreateBook} from './pages/CreateBook.jsx';
import { EditBook } from './pages/EditBook.jsx';
import { DeleteBook } from './pages/DeleteBook.jsx';
import { ShowBook } from './pages/ShowBook.jsx';
import { Signup } from './pages/Signup.jsx';
import { Login } from './pages/Login.jsx';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
      <Route path='/books/details/:id' element={<ShowBook/>}/>
    </Routes>
  )
}

export default App;