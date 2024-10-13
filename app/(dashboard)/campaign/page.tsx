import React from 'react'
import CampaignDashboard from './components/campaign'
// import { useAuth } from "@/context/auth-provider" 
// import { useRouter} from 'next/navigation'

type Props = {}

const Campaign = (props: Props) => {
  // const { userId, isLoggedIn } = useAuth();
  // const router = useRouter()
  // if (!isLoggedIn || !userId) {
  // router.push('/login');
  // }

  return (
    <CampaignDashboard />
  )
}

export default Campaign