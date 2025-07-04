import React from 'react'
import Header from '../components/Header'
import Aside from '../components/Aside'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const People = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const token = user?.token
  const [people, setPeople] = useState([])

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      console.log(data)
      setPeople(data)
    } catch (error) {
      console.error('Error fetching people:', error)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
    fetchPeople()
  }, [token, navigate])

  return (
    <>
      <Header />
      <Aside />
      <div className="flex flex-col items-center mt-28 h-screen">
        <h1>People</h1>
        <ul>
          {people.map((person) => (
            <li key={person.id} className="flex items-center gap-3">
              <img 
                src={person.image ? `http://localhost:3000/${person.image}` : '/avatar.webp'} 
                alt={person.name} 
                className="w-10 h-10 rounded-full"
              />
              <span>{person.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default People