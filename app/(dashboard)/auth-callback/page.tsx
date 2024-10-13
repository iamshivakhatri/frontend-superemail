"use client"

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from "axios"
import { useAuth } from "@/context/auth-provider";


export default function AuthCallback() {
  const { setUser } = useAuth();

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const paramTokens= searchParams.get('tokens')
    if (!paramTokens) {
      console.error('No tokens received')
      router.push('/')
      return
    }
    const tokens = JSON.parse(paramTokens)
  
  
    const storeUserInfo = async () => {

      try {
          const response = await axios.post('https://emailapp-backend.onrender.com/auth/user-info', {
              tokens,
          }, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          const data = response.data;
    
          const store = await axios.post('/api/store-user',{
            email: data.email,
            name: data.name,
            profilePic: data.picture
          })
          if (store.status === 200 || store.status === 201) {
            console.log('User id :', store.data.userId);
            console.log('User picture :', store.data.profilePic); 
            console.log("whole user object :", store.data);
                setUser({
                    userId: store.data.userId,
                    userEmail: store.data.email,
                    userProfilePic: store.data.profilePic,
                    userName: store.data.name,
                });
            } else {
                console.error('Error storing user data:', response.data.error);
            }


          console.log("Response from [Store-user]", store.data);


          } catch (error:any) {
              console.error("Error storing user info:", error.response ? error.response.data : error.message);
          }
      };
  
    
    if (paramTokens) {
      storeUserInfo()
      localStorage.setItem('gmail_tokens', paramTokens)
      console.log('Redirecting to /dashboard')
      router.push('/dashboard')
    } else {
      console.error('No tokens received')
      router.push('/')
    }
  }, [router, searchParams])

  return <div>Processing authentication...</div>
}