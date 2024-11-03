"use client";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/auth-provider';


const NotificationComponent = () => {
  const {userId} = useAuth();
  console.log(userId);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const socket = io('https://backend-superemail.onrender.com');

    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
      socket.emit('registerUser', userId);
    });

    socket.on('ping', () => {
      socket.emit('pong'); // Respond to ping with pong
    });

    socket.on('webhookData', (data) => {
      console.log('Received webhook notification:', data);
      setNotifications((prevNotifications) => [...prevNotifications, data.message]);
      toast.success(`New Notification: ${data.message}`,{
        position: 'bottom-right',
      }); // Show toast notification
    });

    return () => {
      socket.disconnect(); // Clean up on component unmount
    };
  }, []);

  // const handlePing = () => {
  //   socket.emit('ping');
  // };

  return (
    <div className="max-w-lg mx-auto p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
      <h2 className="text-2xl text-center text-gray-800 mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="space-y-2">
          {notifications.map((notification, index) => (
            <li key={index} className="p-2 bg-teal-100 border-l-4 border-teal-500 rounded">
              {notification}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No notifications yet</p>
      )}

    </div>
  );
};

export default NotificationComponent;
