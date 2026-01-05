import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Aside from '../components/Aside';
import io from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';

const PrivateChat = () => {
    const { friendId } = useParams();
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [error, setError] = useState('');
    const [socket, setSocket] = useState(null);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
    const [friend, setFriend] = useState(null);

    const navigate = useNavigate();
    const token = currentUser?.token;

    // Si el usuario no tiene nombre, intentar obtenerlo
    useEffect(() => {
        const fetchUserData = async () => {
            if (token && currentUser?.id && !currentUser?.name) {
                try {
                    const response = await fetch('http://localhost:3000/users/me', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        const updatedUser = { ...currentUser, name: userData.name };
                        setCurrentUser(updatedUser);
                        localStorage.setItem('user', JSON.stringify(updatedUser));
                    }
                } catch (error) {
                    console.error('Error obteniendo datos del usuario:', error);
                }
            }
        };

        fetchUserData();
    }, [token, currentUser?.id, currentUser?.name]);

    useEffect(() => {
        if (!token || !currentUser?.id) {
            navigate('/login');
            return;
        }

        // Obtener mensajes con el amigo
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:3000/messages/friend/${friendId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data || []);
                } else {
                    setError('Error al obtener mensajes');
                }
            } catch (err) {
                console.error('Error fetching messages:', err);
                setError('Error de conexión');
            }
        };

        fetchMessages();

        // Conectar socket
        const newSocket = io('http://localhost:3000', {
            auth: { token },
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            setIsConnected(true);
            setError('');
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setError('Error de conexión: ' + (error.message || 'Desconocido'));
            setIsConnected(false);
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
        });

        newSocket.on('receive_message', (data) => {
            try {
                // Solo agregar mensajes que NO sean del usuario actual (evitar duplicados)
                if (data && data.senderId !== currentUser?.id && (data.senderId === parseInt(friendId) || data.receiverId === parseInt(friendId))) {
                    setMessages((prev) => [...(prev || []), data]);
                }
            } catch (err) {
                console.error('Error handling received message:', err);
            }
        });

        return () => {
            if (newSocket) {
                newSocket.disconnect();
                newSocket.off('receive_message');
            }
        };
    }, [token, friendId, currentUser?.id, navigate]);

    const enviarMensaje = async () => {
        if (!socket || !currentMessage.trim() || !token || !isConnected) {
            if (!isConnected) {
                setError('No hay conexión con el servidor');
            } else if (!currentMessage.trim()) {
                setError('El mensaje no puede estar vacío');
            } else {
                setError('Error de configuración');
            }
            return;
        }

        try {
            // Crear el mensaje local para mostrarlo inmediatamente
            const localMessage = {
                id: Date.now(), // ID temporal
                senderId: currentUser.id,
                senderName: currentUser.name || 'Tú',
                receiverId: parseInt(friendId),
                message: currentMessage.trim(),
                timestamp: new Date().toISOString()
            };

            // Agregar el mensaje al estado local inmediatamente
            setMessages(prev => [...(prev || []), localMessage]);

            // Enviar por socket
            socket.emit('send_message', {
                receiverId: parseInt(friendId),
                message: currentMessage.trim()
            });

            setCurrentMessage('');
            setError('');
        } catch (err) {
            console.error('Error al enviar mensaje:', err);
            setError('Error al enviar el mensaje: ' + (err.message || 'Desconocido'));
        }
    };

    return (
        <div className='flex flex-col items-center mt-28 max-h-[500px] w-screen overflow-y-hidden'>
            <Header />
            <Aside />
            <div className='flex flex-col w-full max-w-4xl mx-auto p-4 overflow-y-hidden ml-0 md:ml-64'>
                <h1 className='text-xl font-bold mb-4'>Chat Privado</h1>
                
                {/* Indicador de conexión */}
                <div className='flex items-center mb-4'>
                    <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className='text-sm text-gray-400'>
                        {isConnected ? 'Conectado' : 'Desconectado'}
                    </span>
                    {connectionError && (
                        <span className='text-sm text-red-400 ml-4'>
                            Error: {connectionError}
                        </span>
                    )}
                </div>

                {error && (
                    <div className='bg-red-600 text-white p-2 rounded mb-4'>
                        {error}
                    </div>
                )}

                <div className='flex flex-col flex-grow overflow-y-scroll mb-4 p-4 bg-gray-800 rounded-lg'>
                    {messages && messages.length > 0 ? messages.map((message, index) => {
                        // Determinar si es mensaje propio
                        const isOwnMessage = message?.userId === currentUser?.id || message?.senderId === currentUser?.id;
                        
                        // Obtener el nombre del usuario
                        const displayName = message?.user?.name || message?.senderName || 'Usuario';
                        
                        // Obtener el contenido del mensaje
                        const messageContent = message?.content || message?.message || '';
                        
                        // Obtener el timestamp
                        const timestamp = message?.createdAt || message?.timestamp;
                        
                        return (
                            <div
                                key={message?.id || index}
                                className={`flex items-start mb-4 ${
                                    isOwnMessage
                                        ? 'justify-end'
                                        : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`p-3 rounded-lg max-w-xs ${
                                        isOwnMessage
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-700 text-white'
                                    }`}
                                >
                                    <span className='font-bold'>
                                        {displayName}:
                                    </span>
                                    <span className='ml-2'>{messageContent}</span>
                                    <br />
                                    <span className='text-xs mt-1 text-gray-400'>
                                        {timestamp ? new Date(timestamp).toLocaleTimeString() : ''}
                                    </span>
                                </div>
                            </div>
                        );
                    }) : (
                        <p className='text-gray-400 text-center'>No hay mensajes aún. ¡Envía el primero!</p>
                    )}
                </div>

                <div className='flex gap-2'>
                    <input
                        className='flex-grow p-2 bg-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        type="text"
                        placeholder='Escribe tu mensaje...'
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && currentMessage.trim() && isConnected) {
                                e.preventDefault();
                                enviarMensaje();
                            } else if (e.key === 'Enter' && !isConnected) {
                                e.preventDefault();
                                setError('No hay conexión con el servidor');
                            }
                        }}
                    />
                    <button
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed'
                        onClick={enviarMensaje}
                        disabled={!currentMessage.trim() || !isConnected}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivateChat;