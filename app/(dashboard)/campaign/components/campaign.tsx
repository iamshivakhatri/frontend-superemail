"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUpRight, Bell, Calendar, Clock, HelpCircle, LayoutDashboard, Mail, Moon, MoreVertical, Plus, Search, Menu, Sun, Loader } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getInitialsFromEmail } from '@/utils/stringUtils';
import { useAuth } from '@/context/auth-provider'
import axios from 'axios';
import CampaignCard from '@/components/campaign-card';

import  CreateCampaignModal from "@/components/modals/create-campaign-modal";
import { Campaign } from '@prisma/client';

interface AudienceFile {
  id: string;
  audienceName: string[];
  audienceEmail: string[];
}



const CampaignDashboard = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; picture: string } | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false);


  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const loadCampaigns = async () => {
    setIsLoading(false); // Set loading state to true before fetching

    try {
      // Fetch campaigns from the API using the userId
      console.log('userId before get request', userId);
      const response = await axios.get("/api/campaign", {
        params: {
          userId: userId,
        },
      });

      console.log('response', response.data);
      // Set the retrieved campaigns in state
      setCampaigns(response.data);

    } catch (error) {
      console.error('Error loading campaigns:', error);
      // Optionally handle error state here (e.g., show a message to the user)
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  };

  // Effect to load campaigns when component mounts
  useEffect(() => {
    if (!userId) {
      return; // Exit early if userId is not available
    }

    loadCampaigns();

  }, [userId]); // Dependency array includes userId


  // Handle clicking on a campaign
  const handleCampaignClick = (campaign: Campaign) => {
    router.push(`/campaign/${campaign.id}`);
  };

  const handleRefreshStats = async () => {
    console.log('Refreshing stats...');
  };


  // Render loading state or campaigns
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  const handleClose = () => {
    setIsOpen(false)
    loadCampaigns();
  }

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <CreateCampaignModal  isOpen={isOpen} onClose={handleClose} />
      <header className="bg-white dark:bg-gray-800 shadow-sm lg:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold dark:text-white">Campaign Dashboard</h1>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 flex-col lg:flex-row space-y-4 lg:space-y-0">
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search campaigns..." className="pl-8 w-full" />
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="hidden lg:inline-flex">
                  <LayoutDashboard className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={toggleDarkMode}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" className="hidden lg:inline-flex">
                  <Bell className="h-5 w-5" />
                </Button>
                <Avatar>
                  {userInfo && userInfo.picture ? (
                    <AvatarImage src={userInfo.picture} alt={userInfo.name || userInfo.email} />
                  ) : (
                    <AvatarFallback>
                      {userInfo ? getInitialsFromEmail(userInfo.email) : 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            </div>

            <Card className="mb-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                  <div className="mb-4 lg:mb-0">
                    <h2 className="text-2xl font-bold mb-2">Welcome to Your Campaign Dashboard!</h2>
                    <p className="text-lg">Track and optimize your email campaigns with ease.</p>
                  </div>
                  {/* <Link href="/create-campaign"> */}
                    <Button variant="secondary" size="lg" className="w-full lg:w-auto" onClick={ ()=>{setIsOpen(true)}}>
                      <Plus className="mr-2 h-4 w-4" /> Create New Campaign
                    </Button>
                  {/* </Link> */}
                </div>
              </CardContent>
            </Card>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold dark:text-white">Your Campaigns</h2>
                <Button onClick={handleRefreshStats} disabled={isLoading}>
                  {isLoading ? <Loader className="h-4 w-4 animate-spin mr-2" /> : null}
                  Refresh Stats
                </Button>
              </div>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader className="h-8 w-8 animate-spin text-purple-500" />
                </div>
              ) : campaigns.length > 0 ? (
                campaigns.map(campaign => (
                  <CampaignCard 
                    key={campaign.id} 
                    campaign={campaign} 
                    onClick={() => handleCampaignClick(campaign)}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">No campaigns found. Create your first campaign now!</p>
              )}
            </div>

            {/* Add more sections here for campaign analytics, performance charts, etc. */}
          </div>
        </main>
      </div>

    </div>
  )
}

export default CampaignDashboard