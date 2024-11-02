'use client';

import React from 'react';
import { useAuth } from "@/context/auth-provider" 
import CreateCampaign from '@/components/create-campaign';

const UserProfile: React.FC = () => {
  const { userId, userEmail, userProfilePic, userName, isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  return (
    <div>
      Test page.
    </div>
    );
};

export default UserProfile;
