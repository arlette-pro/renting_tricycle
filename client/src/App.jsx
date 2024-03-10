import { useState } from 'react'
import './App.css'

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Tricycle } from './pages/Tricycle';
import { Users } from './pages/Users';
import DetailsTricycle from './pages/DetailsTricycle';
import BookTricycle from './pages/BookTricycle';
import Register from './pages/Register';
import { UserContext } from './context/user.context';


function App() {
  const [connectedUser, setConnectedUser] = useState(null)

  function handleLogin(newlyConnectedUser) {
    // logged in user gets set in the connectedUser variable which in turn gets set to the context 5 lines below
    setConnectedUser(newlyConnectedUser)
  }

  return (
    <UserContext.Provider value={connectedUser}>
      <Routes>
        <Route path={'/login'} element={<Login onLogin={handleLogin}/>}/>
        {/* Notice the onLogin property on the Register and Login components */}
        <Route path={'/register'} element={<Register onLogin={handleLogin}/>}/>
        <Route path={'/dashboard'} element={<Dashboard />}>
          <Route path={"tricycles"} element={<Tricycle />}/>
          {connectedUser?.role === "Admin" && (
            // Only users with the admin role can access the users page in the dashboard
            <Route path={"users"} element={<Users />}/>
          )}
        </Route>
        <Route path={'/details/tricycles'} element={<DetailsTricycle/> }/>
        <Route path={'/book/tricycles'} element={<BookTricycle/> }/>
        <Route path={'/'} element={<Navigate to="/login" />}/>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
