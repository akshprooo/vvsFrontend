import React from 'react'
import {Route, Routes} from 'react-router-dom' 
import Home from './pages/Home'
import Login from './pages/Login'
import Apply from './pages/Apply'
import Dashboard from './pages/Dashboard'
import Vote from './pages/Vote'
import Edit from './pages/Edit'
import Navbar from './components/common/Navbar'
import Footer from './components/Home/Footer'

const App = () => {
  return (
    <div className='min-h-screen w-full bg-zinc-200/70 overflow-x-hidden' >
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/apply' element={<Apply />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/vote' element={<Vote />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;