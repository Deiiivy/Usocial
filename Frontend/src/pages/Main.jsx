import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Aside from '../components/Aside';

const Main = () => {
  const titleRef = useRef(null);
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts/GetAllPosts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Error al obtener los posts');
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.error('Error al obtener los posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
      <div className="h-screen flex flex-col">
        <Header />
  
        <div className="flex flex-1 pt-16">
          <Aside />
  
          <main 
            className={`
              flex-1 overflow-y-auto p-6 bg-gray-100 
              ml-0 md:ml-64 
              mb-12 md:mb-0
            `}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul>
                  {posts.map(post => (
                    <li key={post.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                      <p className="text-gray-700">{post.content}</p>
                      <p className="text-gray-500">Creado por: {post.user?.name || 'Usuario desconocido'}</p>
                      {post.image && (
                        <img
                          className="w-full h-auto max-w-80"
                          src={`http://localhost:3000/${post.image}`}
                          alt="Post"
                        />
                      )}
                      <p>{new Date(post.createdAt).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <section>
                <h1></h1>
              </section>
            </div>
          </main>
        </div>
      </div>
  );
};

export default Main;
