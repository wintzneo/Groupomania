import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Profil from './pages/Profil'
import ModifProfil from './pages/ModifProfil'
import ModifPost from './pages/ModifPost'
import Axios from './components/Axios/Axios'

function App() {
  return (
    <BrowserRouter>
      <Axios>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profil />} />
          <Route path="/modif" element={<ModifProfil />} />
          <Route path="/modifpost" element={<ModifPost />} />
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Axios>
    </BrowserRouter>
  )
}

export default App
