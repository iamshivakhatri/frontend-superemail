"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import EmailTrackingStats from '@/components/EmailTrackingStats';
import { updateCampaignStats } from '@/utils/campaignStore';
import { Campaign } from '@prisma/client';

export default function CampaignDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/campaign/${id}`);
          setCampaign(response.data);
          console.log('response for individual api ', response.data);
          fetchLatestStats(response.data);
        } catch (error) {
          console.error('Error fetching campaign:', error);
          router.push('/campaign');
        }
      }
    };

    fetchCampaign();
  }, [id, router]);

  const fetchLatestStats = async (campaign: Campaign) => {
//     try {
//       const response = await fetch('https://emailapp-backend.onrender.com/auth/email-stats', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'ngrok-skip-browser-warning': 'true',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ trackingIds: campaign.trackingIds }),
//       });
//       if (response.ok) {
//         const stats = await response.json();
//         updateCampaignStats(campaign.id, stats);
//         setCampaign((prevCampaign) => ({
//           ...prevCampaign,
//           stats: { ...prevCampaign?.stats, ...stats },
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching latest stats:', error);
//     }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-4 lg:p-8 overflow-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">{campaign.campaignName}</h1>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                  <p className="text-lg font-semibold dark:text-white">{campaign.campaignType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                  <p className="text-lg font-semibold dark:text-white">{campaign.recurringCampaign ? 'Recurring' : 'One-time'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</p>
                  <p className="text-lg font-semibold dark:text-white">{new Date(campaign.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</p>
                    <p className="text-lg font-semibold dark:text-white">
                        {campaign.endDate && new Date(campaign.endDate).toLocaleDateString()}
                    </p>

                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Recipients</p>
           
                 <p className="text-lg font-semibold dark:text-white">
                    {/* {campaign.audiencefile?.audienceEmail.length ?? 0} */}
                    {campaign.delivered  ?? 0}
                 </p>



                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sent</p>
                  <p className="text-lg font-semibold dark:text-white">{campaign.sent}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Delivered</p>
                  <p className="text-lg font-semibold dark:text-white">{campaign.delivered}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Opened</p>
                  <p className="text-lg font-semibold dark:text-white">{campaign.opened}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Clicked</p>
                  <p className="text-lg font-semibold dark:text-white">{campaign.clicked}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <EmailTrackingStats trackingIds={campaign.trackingIds} /> */}
                <p>tracking stats</p>
              </CardContent>
            </Card>

            <div className="mt-8 flex justify-between">
              <Button 
                onClick={() => router.push('/campaign')} 
                variant="outline"
              >
                Back to Dashboard
              </Button>
              <Button 
                onClick={() => fetchLatestStats(campaign)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Refresh Stats
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
