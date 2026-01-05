import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/Usocial_logo.png'

const Register = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const logoRef = useRef(null);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    
    useEffect(() => {
        gsap.fromTo(logoRef.current, 
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
        );
        gsap.fromTo(titleRef.current,
            { opacity: 0, y: -40 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
        );
        gsap.fromTo(subtitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" }
        );
        setIsLoading(false);
    }, []);
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('confirmPassword', confirmPassword);
            if (image) formData.append('image', image);

            const response = await fetch('http://localhost:3000/users/RegisterUser', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al registrar el usuario');
            }
            const data = await response.json();
            console.log("Usuario registrado exitosamente:", data);
            navigate('/login'); 

        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setImage('');
        }catch (error) {
            console.error("Error al registrar:", error);
        }
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setImage('');
    };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-800 text-white p-6'>
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4"
            ref={titleRef}>
            Registro en Usocial
        </h1>

        <img
            src={logo}
            alt="Logo de Usocial"
            ref={logoRef}
            className="w-24 h-24 md:w-32 md:h-32 mb-4 animate__animated animate__fadeInDown"
        />
        <p className="text-lg md:text-xl text-gray-300 mb-6"
            ref={subtitleRef}>
            Completa el formulario para crear tu cuenta y comenzar a disfrutar de Usocial.
        </p>

        <form className="w-full max-w-md bg-black bg-opacity-80 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre de Usuario
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresa tu nombre de usuario"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu correo electrónico"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
                    Imagen (opcional)
                </label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    placeholder="Ingresa tu imagen"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
                    Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
                    Confirmar Contraseña
                </label>
                <input
                    type="password"
                    placeholder="Confirma tu contraseña"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required    
                />

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 mt-6 px-4 py-2"
                >
                    Registrarse
                </button>
            </div>
        </form>
    </div>
  )
}

export default Register
