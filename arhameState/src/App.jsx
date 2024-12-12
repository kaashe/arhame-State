import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SigUp from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './components/Header'
import ProtectRoute from './components/ProtectRoute'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route element={<About />}></Route>
        <Route element={<ProtectRoute />}>
          <Route path='/profile' element={<Profile />}></Route>
        </Route>
        <Route path='/sign-in' element={<SignIn />}></Route>
        <Route path='/sign-up' element={<SigUp />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
