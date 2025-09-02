import React from 'react'
import Aside from '../components/Aside.jsx'
import Header from '../components/Header.jsx'

const Grupos = () => {
  return (
    <div className='flex flex-col items-center mt-28 max-h-[500px] w-screen overflow-y-hidden'>
      <Header />
      <Aside />
      <div className='flex flex-col w-full max-w-4xl mx-auto pl-12 overflow-y-hidden'>
        <h1>Grupos</h1>
      </div>
    </div>
  )
}

export default Grupos
