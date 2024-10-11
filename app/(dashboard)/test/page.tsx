// app/device-tracking/page.tsx
"use client";
import React, { useEffect } from 'react';

const DeviceTrackingPage: React.FC = () => {
  useEffect(() => {
    const sendTrackingData = async () => {
      const data = {
        userId: '6706128e62c37fb8a639a659', // Replace with actual user ID
        campaignId: '67070327abef545181558a78', // Replace with actual campaign ID
        smartphone: Math.floor(Math.random() * 10), // Random value for smartphone opens
        desktopLaptop: Math.floor(Math.random() * 10), // Random value for desktop/laptop opens
        tablet: Math.floor(Math.random() * 10), // Random value for tablet opens
        smartwatch: Math.floor(Math.random() * 10), // Random value for smartwatch opens
        campaignType: 'Email', // Example campaign type
      };

      try {
        const response = await fetch('/api/device', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to send tracking data');
        }

        console.log('Tracking data sent successfully');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    sendTrackingData();
  }, []);

  return <div>Tracking data is being sent...</div>;
};

export default DeviceTrackingPage;
