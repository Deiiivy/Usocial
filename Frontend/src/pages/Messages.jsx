import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Aside from '../components/Aside';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
    const [friends, setFriends] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    useEffect(() => {
        if (!token) {
            setError('No autorizado. Por favor inicia sesión.');
            return;
        }

        const fetchFriends = async () => {
            try {
                const response = await fetch('http://localhost:3000/friends', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setFriends(data);
                } else {
                    setError('Error al obtener amigos');
                }
            } catch (err) {
                setError('Error de conexión');
            }
        };

        fetchFriends();
    }, [token]);

    const openChat = (friendId) => {
        navigate(`/messages/${friendId}`);
    };

    return (
        <div className='flex flex-col items-center mt-28 max-h-[500px] w-screen overflow-y-hidden'>
            <Header />
            <Aside />
            <div className='flex flex-col w-full max-w-4xl mx-auto p-4 overflow-y-hidden ml-0 md:ml-64'>
                <h1 className='text-xl font-bold mb-4'>Chats</h1>
                {error && (
                    <div className='bg-red-600 text-white p-2 rounded mb-4'>
                        {error}
                    </div>
                )}
                <div className='flex flex-col flex-grow overflow-y-scroll mb-4 p-4 bg-gray-800 rounded-lg'>
                    {friends.length === 0 ? (
                        <p className='text-white'>No tienes amigos aún.</p>
                    ) : (
                        friends.map((friend) => (
                            <div
                                key={friend.id}
                                className='flex items-center p-3 mb-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600'
                                onClick={() => openChat(friend.id)}
                            >
                                <div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3'>
                                    {friend.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <span className='text-white font-bold'>{friend.name}</span>
                                    <br />
                                    <span className='text-gray-400 text-sm'>{friend.email}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
