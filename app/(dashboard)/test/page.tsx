'use client';

import React from 'react';
import { useAuth } from "@/context/auth-provider" 

const UserProfile: React.FC = () => {
  const { userId, userEmail, userProfilePic, userName, isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>User Profile</h1>
          <p><strong>Name:</strong> {userName}</p>
          <p><strong>Email:</strong> {userEmail}</p>
          <img src={userProfilePic ?? 'default-pic-url'} alt="Profile" style={{ width: '100px', height: '100px' }} />
          <p><strong>User ID:</strong> {userId}</p>
        </div>
      ) : (
        <p>Please log in to see your profile information.</p>
      )}
    </div>
  );
};

export default UserProfile;
