import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Aside from '../components/Aside';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [userData, setUserData] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  useEffect(() => {
    if (!token) {
      setStatusMessage('No autorizado. Por favor inicia sesión.');
      return;
    }

    const getCurrentUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          localStorage.removeItem('user');
          setStatusMessage('Tu sesión ha expirado. Inicia sesión nuevamente.');
          return;
        }

        if (!response.ok) {
          setStatusMessage('Error al obtener el usuario.');
          throw new Error('Error al obtener el usuario');
        }

        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setStatusMessage('Error al obtener el usuario.');
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts/GetAllPosts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          localStorage.removeItem('user');
          setStatusMessage('Tu sesión ha expirado. Inicia sesión nuevamente.');
          return;
        }

        if (!response.ok) {
          setStatusMessage('Error al obtener los posts.');
          throw new Error('Error al obtener los posts');
        }

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
          setStatusMessage('');
        } else {
          setStatusMessage('No hay posts disponibles.');
        }

      } catch (error) {
        console.error('Error al obtener los posts:', error);
        setStatusMessage('Error al obtener los posts.');
      }
    };

    fetchPosts();
    getCurrentUser();
  }, [token]);

  return (
    <div className='flex flex-col items-center mt-28 h-screen w-screen border-b-blue-200'>
      <Header />
      <Aside />
      <div className='flex flex-row gap-4 mt-4 items-center'>
        <h1 className='text-2xl font-bold'>Profile</h1>
        <h2>Username: <span className='font-bold'>{userData?.name || 'Loading...'}</span></h2>
      </div>
      <div className='flex flex-row gap-4 mt-4'>
        <div>
          <h2 className='font-bold'>Posts</h2>
          <ul>
            {posts.map(post => (
              <div key={post.id} className="flex flex-col gap-2 p-4 border border-gray-200 rounded-lg">
                <li>{post.title}</li>
                <li>{post.image}</li>
                <li>{post.content}</li>
                <li>{post.createdAt}</li>
                <li>{post.user?.name}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      {statusMessage && (
        <p className="text-center text-red-500 font-semibold mt-4">{statusMessage}</p>
      )}
    </div>
  );
};

export default Profile;
