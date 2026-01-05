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
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [pendingRequests, setPendingRequests] = useState([])

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setPeople(data)
    } catch (error) {
      console.error('Error fetching people:', error)
    }
  }

  const searchUsers = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    try {
      const response = await fetch(`http://localhost:3000/friends/search?query=${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Error searching users:', error)
    }
  }

  const sendFriendRequest = async (targetId) => {
    try {
      const response = await fetch('http://localhost:3000/friends/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ targetId })
      })
      if (response.ok) {
        alert('Solicitud de amistad enviada')
        setSearchResults([])
        setSearchQuery('')
      } else {
        alert('Error al enviar solicitud')
      }
    } catch (error) {
      console.error('Error sending friend request:', error)
    }
  }

  const fetchPendingRequests = async () => {
    try {
      const response = await fetch('http://localhost:3000/friends/pending', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setPendingRequests(data)
    } catch (error) {
      console.error('Error fetching pending requests:', error)
    }
  }

  const acceptFriendRequest = async (requesterId) => {
    try {
      const response = await fetch('http://localhost:3000/friends/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ requesterId })
      })
      if (response.ok) {
        alert('Amigo agregado')
        fetchPendingRequests()
      } else {
        alert('Error al aceptar solicitud')
      }
    } catch (error) {
      console.error('Error accepting friend request:', error)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
    fetchPeople()
    fetchPendingRequests()
  }, [token, navigate])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchUsers(searchQuery)
    }, 300)
    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  return (
    <>
      <Header />
      <Aside />
      <div className="flex flex-col items-center mt-28 h-screen p-4">
        <h1 className='text-xl font-bold mb-8'>Buscar Amigos</h1>
        
        {/* Search Bar */}
        <div className="w-full max-w-md mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="w-full max-w-md mb-6">
            <h2 className="text-lg font-semibold mb-2">Resultados de búsqueda</h2>
            <ul className='flex flex-col gap-2'>
              {searchResults.map((person) => (
                <li key={person.id} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <img 
                      src="/avatar.webp" 
                      alt={person.name} 
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <span className="font-medium">{person.name}</span>
                      <br />
                      <span className="text-sm text-gray-600">{person.email}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => sendFriendRequest(person.id)}
                    className='bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 cursor-pointer'
                  >
                    Agregar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="w-full max-w-md mb-6">
            <h2 className="text-lg font-semibold mb-2">Solicitudes pendientes</h2>
            <ul className='flex flex-col gap-2'>
              {pendingRequests.map((request) => (
                <li key={request.id} className="flex items-center justify-between p-2 bg-yellow-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <img 
                      src="/avatar.webp" 
                      alt={request.user.name} 
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <span className="font-medium">{request.user.name}</span>
                      <br />
                      <span className="text-sm text-gray-600">{request.user.email}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => acceptFriendRequest(request.user.id)}
                    className='bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 cursor-pointer'
                  >
                    Aceptar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* All People */}
        <h2 className="text-lg font-semibold mb-4">Personas que quizás conozcas</h2>
        <ul className='flex flex-col gap-5 w-full max-w-md'>
          {people.filter(p => p.id !== user.id).map((person) => (
            <li key={person.id} className="flex items-center gap-4 justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <img 
                  src={person.image ? `http://localhost:3000/${person.image}` : '/avatar.webp'} 
                  alt={person.name} 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <span className="font-medium">{person.name}</span>
                  <br />
                  <span className="text-sm text-gray-600">{person.email}</span>
                </div>
              </div>
              <button 
                onClick={() => sendFriendRequest(person.id)}
                className='bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 cursor-pointer'
              >
                Agregar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default People