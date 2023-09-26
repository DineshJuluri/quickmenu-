import React from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import Home from './components/Home'
import Footer from './components/Footer'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
const App = () => {
  return (
    <div className='h-screen flex flex-col'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/restaurant/:slug' element={<Menu />} />
        <Route path='auth/restaurant/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App