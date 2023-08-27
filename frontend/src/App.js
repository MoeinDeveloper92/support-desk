import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route } from "react-router-dom"
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import { ToastContainer } from "react-toastify"
import NewTicket from './pages/NewTicket'
import "react-toastify/dist/ReactToastify.css"
function App() {
  return (
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='' element={<PrivateRoute />}>
          <Route path='/new-ticket' element={<NewTicket />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App