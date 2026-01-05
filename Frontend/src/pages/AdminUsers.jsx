import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Aside from '../components/Aside';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  const fetchUsers = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) throw new Error('No token encontrado');

      const { token } = storedUser;
      const decoded = parseJwt(token);
      if (!decoded || decoded.role !== 'ADMIN') {
        navigate('/main');
        return;
      }

      const res = await fetch('http://localhost:3000/users/all', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Error al obtener usuarios');
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const { token } = storedUser;

      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Error al eliminar usuario');
      }

      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex">
      <Aside />
      <div className="flex-1">
        <Header />
        <div className="p-6 flex justify-center">
          <div className="w-full max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-white">Gestión de Usuarios</h1>
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden text-white">
              <thead>
                <tr className="bg-gray-700 text-left">
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Nombre</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Rol</th>
                  <th className="py-2 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-gray-700">
                    <td className="py-2 px-4">{u.id}</td>
                    <td className="py-2 px-4">{u.name}</td>
                    <td className="py-2 px-4">{u.email}</td>
                    <td className="py-2 px-4">{u.role}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition duration-300"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-3 px-4 text-center text-gray-400">
                      No hay usuarios
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;

