import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from "./pages/Register"
import Main from "./pages/Main"
import { useState } from "react"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
