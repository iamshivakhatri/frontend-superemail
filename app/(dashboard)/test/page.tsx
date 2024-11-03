"use client";
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/auth-provider';

interface Notification {
  campaignName: string;
  userEmail: string;
}

const NotificationComponent: React.FC = () => {
  const { userId } = useAuth(); // Assuming this gives the current user's ID
  const [notifications, setNotifications] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io('https://backend-superemail.onrender.com');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server:', newSocket.id);
      newSocket.emit('registerUser', userId);
    });

    newSocket.on('webhookData', async (data: { message: [string, string, string] }) => {
      const [trackingId, campaignId, receivedUserId] = data.message;

      // Check if the received userId matches the logged-in user's ID
      if (receivedUserId !== userId) return;

      try {
        // Fetch campaign name and user email from the backend API
        const response = await axios.get<Notification>('/api/getcampaign', {
          params: { campaignId, userId },
        });
        const { campaignName } = response.data;

        // Create notification message
        const notificationMessage = `One of the user opened the campaign: ${campaignName}`;
        
        // Update the notifications list and show a toast
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          notificationMessage,
        ]);
        toast.success(notificationMessage, {
          position: 'bottom-right',
        });
      } catch (error) {
        console.error('Error fetching campaign details:', error);
        toast.error('Failed to fetch campaign details');
      }
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [userId]);

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
