import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from "./pages/Register"
import Main from "./pages/Main"
import CreatePost from "./pages/CreatePost"
import LogOut from "./pages/LogOut"
import Profile from "./pages/Profile"
import Messages from "./pages/Messages"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
