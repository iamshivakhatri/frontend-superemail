import React from 'react'
import { AuthProvider } from '@/context/auth-provider'
import { useAuth } from '@/context/auth-provider'

type Props = {}

const page = (props: Props) => {
  // const {userEmail, userId, userName, userProfilePic} = useAuth()
  const { userId } = useAuth (); 
  // console.log('userEmail :', userEmail);
  console.log('userId :', userId);
  // console.log('userName :', userName);
  // console.log('userProfilePic :', userProfilePic);

  return (
    <div>page</div>
  )
}

export default page