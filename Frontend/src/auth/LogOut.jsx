import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Aside from '../components/Aside';

const LogOut = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen border-b-blue-200'>
        <Header />
        <Aside />
        <h1 className='text-2xl font-bold'>LogOut</h1>
        <p className='text-lg'>¿Estas seguro de que quieres cerrar sesión?</p>
        <div className='flex flex-row gap-4 mt-4'>
            <button onClick={() => {
                localStorage.removeItem('user');
                navigate('/login');
            }} className='bg-blue-500 text-white pt-2 pb-2 pl-4 pr-4 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer'>Si</button>
            <button onClick={() => navigate('/main')} className='bg-red-500 text-white pt-2 pb-2 pl-4 pr-4 rounded-lg hover:bg-red-600 transition duration-300 cursor-pointer'>No</button>
        </div>
    </div>
  )
}
export default LogOut