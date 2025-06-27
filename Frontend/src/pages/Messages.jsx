import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Aside from '../components/Aside';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [error, setError] = useState('');
    const [socket, setSocket] = useState(null);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    useEffect(() => {
        if (!token) {
            setError('No autorizado. Por favor inicia sesión.');
            return;
        }

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
            setError('Error de conexión: ' + error.message);
        });

        newSocket.on('receive_message', (data) => {
            console.log('Mensaje recibido:', data);
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            newSocket.disconnect();
            newSocket.off('receive_message');
        };
    }, []); 

    const enviarMensaje = (recipientId) => {
        if (!socket || !currentMessage.trim()) return;

        socket.emit('send_message', {
            recipientId: recipientId || user.id,
            message: currentMessage
        });

        setCurrentMessage('');
    };

    return (
        <div className='flex flex-col items-center mt-28 max-h-[600px] w-screen overflow-y-hidden '>
            <Header />
            <Aside />
            <div className='flex flex-col w-full max-w-4xl mx-auto p-4 overflow-y-hidden'>
                <h1 className='text-xl font-bold mb-4'>Messages</h1>

                {error && (
                    <div className='bg-red-600 text-white p-2 rounded mb-4'>
                        {error}
                    </div>
                )}

                <div className='flex flex-col flex-grow overflow-y-scroll mb-4 p-4 bg-gray-800 rounded-lg'>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-start mb-4 ${
                                message.senderId === user.id
                                    ? 'justify-end'
                                    : 'justify-start'
                            }`}
                        >
                            <div
                                className={`p-3 rounded-lg max-w-xs ${
                                    message.senderId === user.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-white'
                                }`}
                            >
                                <span className='font-bold'>{message.senderId}:</span>
                                <span className='ml-2'>{message.message}</span>
                                <br />
                                <span className='text-xs mt-1 text-gray-400'>
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex gap-2'>
                    <input
                        className='flex-grow p-2 bg-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        type="text"
                        placeholder='Type your message...'
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
                    />
                    <button
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
                        onClick={() => enviarMensaje()}
                        disabled={!currentMessage.trim()}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Messages;
