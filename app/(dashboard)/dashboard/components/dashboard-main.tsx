import React, { useState, useEffect } from 'react';
import { Bell, LayoutDashboard, Menu, Moon, Plus, Search, Sun } from 'lucide-react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';
import axios from 'axios';
import StatCards from './stat-card';
import EmailPerformanceTrends from './email-performance-trends'
import DevicePerformance from './device-performance';
import { Campaign } from '@prisma/client';
import { set } from 'date-fns';


const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]); // Use the imported Campaign type
  const [campaignType, setCampaignType] = useState('all');
  const [dateRange, setDateRange] = useState('7'); // Default to 'Last 7 days'
  const [updatedCampaigns, setUpdatedCampaigns] = useState<Campaign[]>([]); // Use the imported Campaign type



  const userId = "6706128e62c37fb8a639a659";

  // Handle campaignType change
  const handleCampaignTypeChange = (value: string) => {
    setCampaignType(value);
    console.log('Campaign type:', value);
    console.log('Campaigns:', campaigns);
    
    const updatedCampaignsValue = campaigns.filter((campaign) => {
      console.log('Current campaign:', campaign); // Log each campaign
      if (value === 'all') {
        console.log('All campaigns:', campaigns);
        return true;
      }
      console.log("this is campaign type",campaign.campaignType);
      return campaign.campaignType === value; // Compare against the new value
    });
    
    setUpdatedCampaigns(updatedCampaignsValue); // Update the campaigns state with the filtered campaigns
  };
  

  // Handle dateRange change
  // Handle dateRange change
    const handleDateRangeChange = (value: string) => {
      setDateRange(value);
      console.log('Date range:', value);
      
      const currentDate = new Date();
      const updatedCampaignsValue = campaigns.filter((campaign) => {
          const campaignDate = new Date(campaign.createdAt);
          let isInRange = false;

          switch (value) {
              case '7':
                  isInRange = (currentDate.getTime() - campaignDate.getTime()) <= 7 * 24 * 60 * 60 * 1000; // Last 7 days
                  break;
              case '30':
                  isInRange = (currentDate.getTime() - campaignDate.getTime()) <= 30 * 24 * 60 * 60 * 1000; // Last 30 days
                  break;
              case 'all':
              default:
                  isInRange = true; // If 'all', include all campaigns
                  break;
          }
          return isInRange; // Return true if the campaign is in the selected date range
      });

      setUpdatedCampaigns(updatedCampaignsValue); // Update the campaigns state with the filtered campaigns
    };


  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`/api/campaign?userId=${userId}`);
        setCampaigns(response.data);
        setUpdatedCampaigns(response.data);
        console.log('Fetched campaigns:', response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, [userId]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="bg-white dark:bg-gray-800 shadow-sm lg:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold dark:text-white">Dashboard</h1>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-4 lg:p-8 overflow-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 flex-col lg:flex-row space-y-4 lg:space-y-0">
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Filter by name or description..." className="pl-8 w-full" />
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
                  {userInfo? (
                    <p>SK</p>// <AvatarImage src={userInfo?.picture} alt={userInfo?.name || userInfo.email} /> 
                  ) : (
                    <AvatarImage src="/placeholder-avatar.png" alt="User" />
                  )}
                </Avatar>
              </div>
            </div>

            <Card className="mb-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                  <div className="mb-4 lg:mb-0">
                    <h2 className="text-2xl font-bold mb-2">Welcome to Your Email Analytics Dashboard!</h2>
                    <p className="text-lg">Track and analyze your email campaign performance with ease.</p>
                  </div>
                  <Button variant="secondary" size="lg" className="w-full lg:w-auto">Explore Features</Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center mb-6 flex-col lg:flex-row space-y-4 lg:space-y-0">
              <h1 className="text-2xl font-bold dark:text-white">Email Analytics</h1>
              <Link href="/create-campaign">
                <Button className="w-full lg:w-auto">
                  <Plus className="mr-2 h-4 w-4" /> Create Campaign
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Select onValueChange={handleCampaignTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="promotional">Promotional</SelectItem>
                  <SelectItem value="transactional">Transactional</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={handleDateRangeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
          
            </div>

            <StatCards campaigns={updatedCampaigns} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <EmailPerformanceTrends campaigns={updatedCampaigns} />

             <DevicePerformance campaigns = {updatedCampaigns} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;