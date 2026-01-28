import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Home from './pages/Home'
import Login from "./auth/Login"
import Register from "./auth/Register"
import Main from "./pages/Main"
import CreatePost from "./pages/CreatePost"
import LogOut from "./auth/LogOut"
import Profile from "./pages/Profile"
import Messages from "./pages/Messages"
import PrivateChat from "./pages/PrivateChat"
import Groups from "./pages/Groups"
import Setting from "./pages/Setting"
import People from "./pages/People"
import AdminUsers from "./pages/AdminUsers.jsx";
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
        <Route path="/messages/:friendId" element={<PrivateChat />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/people" element={<People />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
