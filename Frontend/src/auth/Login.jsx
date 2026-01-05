import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import logo from '/Usocial_logo1.png'

const Login = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const logoRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    gsap.fromTo(logoRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
    )
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    )  
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" }
    )
    setIsLoading(false)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/users/LoginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al iniciar sesión')
      }

      const data = await response.json()
      localStorage.setItem('user', JSON.stringify({
        id: data.user.id,
        name: data.user.name,
        token: data.token
      }));
      navigate('/Main')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <img src={logo} alt="Usocial Logo" className="w-32 h-32 mb-6" ref={logoRef} />
      <h1 className="text-4xl font-bold mb-2" ref={titleRef}>Iniciar Sesión</h1>
      <p className="text-gray-400 mb-6" ref={subtitleRef}>
        Bienvenido de nuevo, por favor ingresa tus credenciales
      </p>

      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           className='bg-gray-800 border border-gray-700 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out w-full'
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           className='bg-gray-800 border border-gray-700 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out w-full'
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          >
            Iniciar Sesión
          </button>
          <a href="/register" className="text-blue-400 hover:text-blue-600 text-sm">
            ¿No tienes una cuenta? Regístrate aquí
          </a>
        </div>
      </form>
    </div>
  )
}

export default Login
