import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from "./pages/Home";
import Login from './pages/Login'
import AxiosIntercept from "./components/AxiosIntercept";

function App() {
  return (
    <BrowserRouter>
      <AxiosIntercept>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </AxiosIntercept>
    </BrowserRouter>
  )
}

export default App
