import { useState } from 'react'
import Button from '@mui/material/Button';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Tricycle } from './pages/Tricycle';
import { Users } from './pages/Users';
import DetailsTricycle from './pages/DetailsTricycle';
import BookTricycle from './pages/BookTricycle';
import Register from './pages/Register';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path={'/login'} element={<Login />}/>
      <Route path={'/register'} element={<Register/>}/>
      <Route path={'/dashboard'} element={<Dashboard />}>
        <Route path={"tricycles"} element={<Tricycle />}/>
        <Route path={"users"} element={<Users />}/>
      </Route>
      <Route path={'/details/tricycles'} element={<DetailsTricycle/> }/>
      <Route path={'/book/tricycles'} element={<BookTricycle/> }/>
    </Routes>
  )
}

export default App
