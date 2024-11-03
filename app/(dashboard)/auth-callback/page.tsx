"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from "axios";
import { useAuth } from "@/context/auth-provider";

export default function AuthCallback() {
  const { setUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const paramTokens = searchParams.get('tokens');
    
    if (!paramTokens) {
      console.error('No tokens received');
      router.push('/login');
      return;
    }

    const tokens = JSON.parse(paramTokens);
    console.log('Tokens received :', tokens);
  
    const storeUserInfo = async () => {
      try {
        // Send tokens to your backend to retrieve user info
        const response = await axios.post('https://backend-superemail.onrender.com/auth/user-info', {
          tokens,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = response.data;

        // Store user data in the database
        const storeResponse = await axios.post('/api/store-user', {
          email: data.email,
          name: data.name,
          profilePic: data.picture
        });

        // Check the status of the storing operation
        if (storeResponse.status === 200 || storeResponse.status === 201) {
          console.log('User ID:', storeResponse.data.userId);
          console.log('User Picture:', storeResponse.data.profilePic); 
          console.log("Whole User Object:", storeResponse.data);

          // Update the context with user info
          setUser({
            userId: storeResponse.data.userId,
            userEmail: storeResponse.data.email,
            userProfilePic: storeResponse.data.profilePic,
            userName: storeResponse.data.name,
            tokenData: tokens // You might want to include the tokens here if necessary
          });

          // Store tokens in local storage
          localStorage.setItem('gmail_tokens', paramTokens);
          console.log('Redirecting to /dashboard');
          router.push('/dashboard'); // Redirect to dashboard
        } else {
          console.error('Error storing user data:', storeResponse.data.error);
        }

        console.log("Response from [Store-user]:", storeResponse.data);
      } catch (error: any) {
        console.error("Error storing user info:", error.response ? error.response.data : error.message);
      }
    };

    storeUserInfo();
  }, [router, searchParams, setUser]);

  return <div>Processing authentication...</div>;
}
