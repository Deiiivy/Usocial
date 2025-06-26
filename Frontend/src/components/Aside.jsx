import React, { useState } from 'react'

const Aside = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <aside 
        className={`
          fixed top-16 bottom-0 left-0 w-64 bg-gradient-to-br from-black to-gray-800 text-white shadow-md overflow-y-auto 
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'md:left-0 left-0' : 'md:left-0 -left-full'}
        `}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Menú</h2>
          <ul className="space-y-2">
            <li><a href="/profile" className="text-xl font-bold text-gray-300 hover:text-blue-500" onClick={handleLinkClick}>Perfil</a></li>
            <li><a href="/groups" className="text-xl font-bold text-gray-300 hover:text-blue-500" onClick={handleLinkClick}>Grupos</a></li>
            <li><a href="/messages" className="text-xl font-bold text-gray-300 hover:text-blue-500" onClick={handleLinkClick}>Mensajes</a></li>
            <li><a href="/createPost" className="text-xl font-bold text-gray-300 hover:text-blue-500" onClick={handleLinkClick}>Crear Post</a></li>
            <li><a href="/settings" className="text-xl font-bold text-gray-300 hover:text-blue-500" onClick={handleLinkClick}>Configuración</a></li>
            <li><a href="/logout" className="text-xl font-bold text-gray-300 hover:text-blue-500" onClick={() => {
              localStorage.removeItem('token')
              setIsOpen(false)
            }}>Cerrar sesión</a></li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Aside