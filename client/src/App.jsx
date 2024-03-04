import { useState } from 'react'
import Button from '@mui/material/Button';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { Tricycle } from './pages/Tricycle';
import { Users } from './pages/Users';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path={'/'} element={<Login />}/>
      <Route path={'/signup'} element={<SignUp/>}/>
      <Route path={'/dashboard'} element={<Dashboard />}>
        <Route path={"tricycles"} element={<Tricycle />}/>
        <Route path={"users"} element={<Users />}/>
      </Route>
    </Routes>
  )
}

export default App
