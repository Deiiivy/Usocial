import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Aside from '../components/Aside';
import Header from '../components/Header';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert('Por favor, inicia sesión para crear un post');
      navigate('/login');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('userId', user.id);
      if (image) formData.append('image', image);

      const response = await fetch('http://localhost:3000/posts/CreatePost', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Error al crear el post');

      alert('Post creado correctamente');
      navigate('/main');
    } catch (error) {
      console.error('Error al crear el post:', error);
      alert('Error al crear el post');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="h-screen flex flex-col mt-8 mb-8">
      <Header />
      <Aside />
      <main className="ml-64 flex-1 overflow-y-auto p-6 bg-gray-100 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Crear Post</h1>
          <form 
            onSubmit={handleSubmit} 
            className="bg-white rounded-lg shadow-xl p-8 space-y-6"
            encType="multipart/form-data"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                placeholder="Escribe un título atractivo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Contenido</label>
              <textarea
                placeholder="Escribe el contenido de tu post"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none min-h-[150px]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-5">Imagen (opcional)</label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                    id="imageInput"
                  />
                  <label 
                    htmlFor="imageInput" 
                    className="w-full px-6 py-4 border border-blue-700 rounded-xl cursor-pointer hover:bg-blue-800 transition-colors bg-gray-800 text-white"
                  >
                    {image ? 'Cambiar imagen' : 'Seleccionar imagen'}
                  </label>
                </div>
                {image && (
                  <div className="relative w-48 h-48">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setImage(null);
                      }}
                      className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      ×
                    </button>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Vista previa"
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Crear Post
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreatePost;
