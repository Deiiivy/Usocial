import React, { useState } from 'react'
import logo from '../assets/Usocial_logo.png';
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import { IoMdChatbubbles } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { MdGroups } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 flex justify-between items-center z-10">
      <div className="flex items-center text-center">
        <img src={logo} alt="Usocial Logo" className="w-12 h-12" />
      </div>

      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-800"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <nav className="hidden md:flex space-x-4 items-center">
        <IoHomeOutline />
        <a href="/main" className="text-lg max-md:text-xs hover:text-blue-500">Inicio</a>
        <FaRegUser />
        <a href="/profile" className="text-lg max-md:text-xs hover:text-blue-500">Perfil</a>
        <MdGroups />
        <a href="/groups" className="text-lg max-md:text-xs hover:text-blue-500">Grupos</a>
        <IoPeople />
        <a href="/people" className="text-lg max-md:text-xs hover:text-blue-500">People</a>
        <IoMdAddCircleOutline />
        <a href="/createPost" className="text-lg max-md:text-xs hover:text-blue-500">Crear Post</a>
        <IoMdChatbubbles />
        <a href="/messages" className="text-lg max-md:text-xs hover:text-blue-500">Mensajes</a>
        <CiSettings />
        <a href="/settings" className="text-lg max-md:text-xs hover:text-blue-500">Configuración</a>
        <IoIosLogOut />
        <a href="/logout" className="text-lg max-md:text-xs hover:text-blue-500" onClick={() => localStorage.removeItem('token')}>Cerrar sesión</a>
      </nav>

      <div 
        className={` flex flex-col items-center 
          md:hidden absolute right-4 top-12 bg-gray-800 rounded-lg shadow-lg p-2 
          ${isMenuOpen ? 'block' : 'hidden'}
        `}
      >
        <IoHomeOutline />
        <a href="/main" className="block px-4 py-2 hover:bg-gray-700 text-lg max-md:text-xs">Inicio</a>
        <FaRegUser />
        <a href="/profile" className="block px-4 py-2 hover:bg-gray-700 text-lg max-md:text-xs">Perfil</a>
        <IoMdPeople />
        <a href="/groups" className="block px-4 py-2 hover:bg-gray-700 text-lg max-md:text-xs">Grupos</a>
        <IoPeople />
        <a href="/people" className="block px-4 py-2 hover:bg-gray-700 text-lg max-md:text-xs">People</a>
        <IoMdAddCircleOutline />
        <a href="/createPost" className="block px-4 py-2 hover:bg-gray-700 text-lg max-md:text-xs">Crear Post</a>
        <IoMdChatbubbles />
        <a href="/messages" className="block px-4 py-2 hover:bg-gray-700 text-lg max-md:text-xs">Mensajes</a>
        <CiSettings />
        <a href="/settings" className="block px-4 py-2 hover:bg-gray-700 text-lg max-md:text-xs">Configuración</a>
        <IoIosLogOut />
        <a 
          href="/logout" 
          className="block px-4 py-2 hover:bg-gray-700 text-lg max-md:text-xs" 
          onClick={() => localStorage.removeItem('token')}
        >
          Cerrar sesión
        </a>
      </div>
    </header>
  )
}

export default Header