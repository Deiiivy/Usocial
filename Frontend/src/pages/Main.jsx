import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import logo from '../assets/Usocial_logo.png'
import { useState } from 'react'


const Main = () => {
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const logoRef = useRef(null)

    
  return (
    <div>
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <img src={logo}  alt="Usocial Logo" className="w-12 h-12" />
            <nav className="space-x-4">
                <a href="/main" className="hover:text-blue-500">Inicio</a>
                <a href="/profile" className="hover:text-blue-500">Perfil</a>
                <a href="/groups" className="hover:text-blue-500">Grupos</a>
                <a href="/messages" className="hover:text-blue-500">Mensajes</a>
                <a href="/settings" className="hover:text-blue-500">Configuración</a>
                <a href="/logout" className="hover:text-blue-500">Cerrar sesión</a>
            </nav>
        </header>


        <section className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            <aside className="w-full md:w-1/4 p-4 shadow-md bg-white">
                <h2 className="text-xl font-bold mb-4">Menú</h2>
                <ul className="space-y-2">
                    <li><a href="/profile" className="text-gray-700 hover:text-blue-500">Perfil</a></li>
                    <li><a href="/groups" className="text-gray-700 hover:text-blue-500">Grupos</a></li>
                    <li><a href="/messages" className="text-gray-700 hover:text-blue-500">Mensajes</a></li>
                    <li><a href="/settings" className="text-gray-700 hover:text-blue-500">Configuración</a></li>
                    <li><a href="/logout" className="text-gray-700 hover:text-blue-500">Cerrar sesión</a></li>
                </ul>
            </aside>
        </section>

        <main className="flex-1 p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4" ref={titleRef}>Bienvenido a Usocial</h1>
        </main>
    </div>
  )
}

export default Main