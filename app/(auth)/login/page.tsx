"use client";

import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import useAuth from "@/hooks/useAuth";
// import * as jwt_decode from "jwt-decode";

export default function Login() {
  const isLoggedIn = useAuth();  
  console.log('isLoggedIn:', isLoggedIn);
  const router = useRouter();

  // Function to check if the token exists and is valid
  const checkTokenValidity = () => {
    const token = localStorage.getItem('gmail_tokens');
    console.log('Token from localstorage:', token);

    if (token) {
      try {
        console.log('Token:', token);
        // const decodedToken = jwt_decode(token); // Decode the JWT token
        // console.log('Decoded token:', decodedToken);

        // // Check the token expiration
        // const currentTime = Date.now() / 1000; // Current time in seconds
        // if (decodedToken.exp && decodedToken.exp > currentTime) {
        //   // Token is valid, redirect to the dashboard
        //   router.push('/');
        // } else {
        //   // Token has expired, clear it from local storage
        //   localStorage.removeItem('gmail_tokens');
        // }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('gmail_tokens');
      }
    }
  };

  // Check token validity on component mount
  useEffect(() => {
    checkTokenValidity();
  }, []);

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      // Redirect to your backend's Google OAuth URL
      window.location.href = 'https://emailapp-backend.onrender.com/auth/google';
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login to Email App</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGoogleLogin} className="w-full">
            Login with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
