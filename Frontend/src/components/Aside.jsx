import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import { IoMdChatbubbles } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

const Aside = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <>
      <aside className="hidden md:fixed md:top-16 md:bottom-0 md:left-0 md:w-64 md:bg-gradient-to-br md:from-black md:to-gray-800 md:text-white md:shadow-md md:overflow-y-auto md:flex md:flex-col">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Menú</h2>
          <ul className="space-y-2">
            <li><a href="/profile" className="flex items-center gap-2 text-xl font-bold text-gray-300 hover:text-blue-500"><FaRegUser /> Perfil</a></li>
            <li><a href="/groups" className="flex items-center gap-2 text-xl font-bold text-gray-300 hover:text-blue-500"><IoMdPeople /> Grupos</a></li>
            <li><a href="/messages" className="flex items-center gap-2 text-xl font-bold text-gray-300 hover:text-blue-500"><IoMdChatbubbles /> Mensajes</a></li>
            <li><a href="/createPost" className="flex items-center gap-2 text-xl font-bold text-gray-300 hover:text-blue-500"><IoMdAddCircleOutline /> Crear Post</a></li>
            <li><a href="/settings" className="flex items-center gap-2 text-xl font-bold text-gray-300 hover:text-blue-500"><CiSettings /> Configuración</a></li>
            <li><a href="/logout" onClick={handleLogout} className="flex items-center gap-2 text-xl font-bold text-gray-300 hover:text-blue-500"><IoIosLogOut /> Cerrar sesión</a></li>
          </ul>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-br from-black to-gray-800 text-white shadow-inner flex justify-around py-2 md:hidden">
        <a href="/profile" className="hover:text-blue-500"><FaRegUser size={24} /></a>
        <a href="/groups" className="hover:text-blue-500"><IoMdPeople size={24} /></a>
        <a href="/messages" className="hover:text-blue-500"><IoMdChatbubbles size={24} /></a>
        <a href="/createPost" className="hover:text-blue-500"><IoMdAddCircleOutline size={24} /></a>
        <a href="/settings" className="hover:text-blue-500"><CiSettings size={24} /></a>
        <a href="/logout" onClick={handleLogout} className="hover:text-blue-500"><IoIosLogOut size={24} /></a>
      </nav>
    </>
  )
}

export default Aside
