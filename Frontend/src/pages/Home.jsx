import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import logo from '/Usocial_logo1.png'

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
    );
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br background from-black to-gray-800 text-white p-6">
      <img
        ref={logoRef}
        src={logo}
        alt="Usocial Logo"
        className="w-24 h-24 mb-6 drop-shadow-lg"
      />
      <h1
        ref={titleRef}
        className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 text-center drop-shadow"
      >
        Bienvenido a Usocial
      </h1>
      <p
        ref={subtitleRef}
        className="text-lg md:text-xl text-gray-700 font-medium text-center max-w-xl mb-2"
      >
        La red social universitaria donde la confianza y la colaboración impulsan tu crecimiento académico.
      </p>
      <p className="text-base text-gray-500 text-center max-w-lg">
        Crea tu perfil, conecta con compañeros, comparte tus ideas y únete a grupos de estudio. ¡Haz crecer tu red y tu futuro con Usocial!
      </p>

      <div className='mt-8 flex flex-row gap-4'>
        <button className='bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300'>
          <a
            href="/register"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Registrarse
          </a>
        </button>
        <button className='bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300'>
          <a
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Iniciar Sesión
          </a>
        </button>
      </div>
    </div>
  )
}

export default Home
